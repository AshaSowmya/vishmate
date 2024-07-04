const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');
const apiRoutes = require('./app/routes/apiRoutes');
const authRoutes = require('./app/routes/authRoutes');
const verifyToken1 = require('./middleware/apiTokenMiddleware');
require('dotenv').config();
const cors = require('cors');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const mysql = require('mysql2');
const config = require('../Vishmatebackend/config/config');


// var admin = require("firebase-admin");

// var serviceAccount = require("./vismate-813d6-firebase-adminsdk-vvgjo-adb6b763e8.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });



// Initialize Razorpay instance 
const razorpay = new Razorpay({
  key_id:  "rzp_live_kKjpnFSE2Io12w" || process.env.KEY_ID,
  key_secret: "JiXQSnJSF10dkM06SBgzNJ1W" || process.env.KEY_SECRET,
});

const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware for CORS
const corsOptions = {
  origin: '*', // Change this to your client app's URL
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL connection setup
const connection = mysql.createConnection(config.database);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    throw err;
  }
  console.log('Connected to MySQL database');
});

async function updateUserStatus(subscriptionId) {
  try {
    const fetchedSubscription = await razorpay.subscriptions.fetch(subscriptionId);
    const status = fetchedSubscription.status === 'active' ? 'paid' : 'unpaid';
    const updateStatusQuery = 'UPDATE userlogin SET userstatus = ? WHERE subscription_id = ?';
    const updateStatusValues = [status, subscriptionId];

    connection.query(updateStatusQuery, updateStatusValues, (err, result) => {
      if (err) {
        console.error(`Error updating user status for subscription ${subscriptionId}:`, err);
      } else {
        console.log(`User status updated to ${status} for subscription ${subscriptionId}`);
      }
    });
  } catch (error) {
    console.error('Error fetching subscription details from Razorpay:', error);
    throw error;
  }
}

// Route for fetching subscriptions
app.get('/subscriptions', async (req, res) => {
  try {
    const subscriptionsResponse = await razorpay.subscriptions.all();
    const subscriptions = subscriptionsResponse.items.map(subscription => ({
      id: subscription.id,
      plan_id: subscription.plan_id,
      status: subscription.status,
      customer_id: subscription.customer_id,
      last_payment_id: subscription.last_payment_id,
      current_end: subscription.current_end
    }));

    // Call function to update user status
    await updateUserStatus(subscriptions);

    res.json({ subscriptions });
  } catch (error) {
    console.error('Error fetching subscriptions from Razorpay:', error);
    res.status(500).json({ error: 'Could not fetch subscriptions from Razorpay' });
  }
});

// Route for fetching payments
app.get('/payments', async (req, res) => {
  try {
    const paymentsResponse = await razorpay.payments.all();
    const payments = paymentsResponse.items.map(payment => ({
      id: payment.id,
      amount: payment.amount,
      status: payment.status,
      order_id: payment.order_id,
      invoice_id: payment.invoice_id,
      method: payment.method,
      customer_details: payment.customer_details || {}
    }));
    res.json({ payments });
  } catch (error) {
    console.error('Error fetching payments from Razorpay:', error);
    res.status(500).json({ error: 'Could not fetch payments from Razorpay' });
  }
});

app.post('/create-subscription', async (req, res) => {
  const { planId } = req.body;

  if (!planId) {
    return res.status(400).json({ success: false, error: 'Plan ID is required' });
  }

  const options = {
    plan_id: planId, // Use the plan_id from the request body
    total_count: 12, // Total count of payments for the subscription
    customer_notify: 1, // Send notification to the customer via email (Razorpay handles this)
  };

  try {
    const subscription = await razorpay.subscriptions.create(options);
    console.log('Subscription created successfully:', subscription);

    // Respond with the subscription details
    res.json({ success: true, subscription });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
 
// Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Your API Title',
    version: '1.0.0',
    description: 'API documentation using Swagger with Node.js, Express.js, and MySQL',
  },
  servers: [
    {
      url: `https://${process.env.HOSTNAME}:${process.env.PORT}`,
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./app/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use routes
app.use('/api', verifyToken1, apiRoutes);
app.use('/auth', authRoutes);

/**************************Swagger Documentation Code***************************/
// Handle client-side routing by returning index.html for all routes
app.post('*', (req, res) => {
  res.sendFile(path.join(__dirname, './document_file/postindex.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './document_file/getindex.html'));
});
app.put('*', (req, res) => {
  res.sendFile(path.join(__dirname, './document_file/putindex.html'));
});
app.delete('*', (req, res) => {
  res.sendFile(path.join(__dirname, './document_file/deleteindex.html'));
});
/*******************************************************************************/


// File upload route
app.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const uploadedFile = files.upload;
    const newFilePath = path.join(uploadsDir, uploadedFile.name);

    fs.rename(uploadedFile.path, newFilePath, (err) => {
      if (err) {
        console.error('Error moving file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.status(200).send(`
        <h2>File uploaded successfully!</h2>
        <img src="/uploads/${uploadedFile.name}" style="max-width: 100%;" />
      `);
    });
  });
});

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1); // Mandatory (as per the Node.js docs)
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Recommended: send the information to sentry.io or other crash reporting services
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// Start the server
const PORT = process.env.PORT || 2003;
const HOSTNAME ='vishmate.com';

let httpServer = http.createServer(app);
let httpsServer;

if (process.env.HTTPS === 'true') {
  const options = {
    cert: fs.readFileSync('/etc/letsencrypt/live/vishmate.com/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/vishmate.com/privkey.pem'),
    passphrase: 'Vinsup@123.!@#', // Replace with your actual passphrase
  };

  httpsServer = https.createServer(options, app);
  httpsServer.listen(PORT, HOSTNAME, () => {
    console.log(`HTTPS Server is running at https://${HOSTNAME}:${PORT}`);
  });
} else {
  httpServer.listen(PORT, HOSTNAME, () => {
    console.log(`HTTP Server is running at http://${HOSTNAME}:${PORT}`);
  });
}

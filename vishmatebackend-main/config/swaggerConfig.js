const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'your title',
    version: '1.0.0',
    description: 'API documentation using Swagger with Node.js, Express.js, and MySQL',
  },
  servers: [
    {
      url: 'https://localhost:2001', // Change this URL to your server URL
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./apiRoutes/*.js'], // Modify this path to where your route files are located
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

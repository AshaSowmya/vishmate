const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const aws = require("aws-sdk");
const AddBussiness = require("../models/AddBussiness");
require('dotenv').config();


const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const REGION = process.env.REGION;
const BUCKET = process.env.BUCKET;

aws.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: REGION,
}); 

// Create an S3 service object
const s3 = new aws.S3();

exports.AddBussiness = async (req, res) => {
  try {
    // Extract data from request body
    const {
      customer_id ,
      selected_category,
      bussiness_name,
      address,
      mobile_no,
      alternate_no,
      email,
      website,
    } = req.body;

    // Extract uploaded files
    const upload_logo = req.files && req.files["upload_logo"]
      ? req.files["upload_logo"][0]
      : undefined;

    const footer_image = req.files && req.files["footer_image"]
      ? req.files["footer_image"][0]
      : undefined;

    // Generate unique file names
    const addbussinessImageName = upload_logo
      ? `${uuidv4()}-${upload_logo.originalname}`
      : "none";
    const addbussinessfooterImageName = footer_image
      ? `${uuidv4()}-${footer_image.originalname}`
      : "none";

    // Upload files to AWS S3 bucket
    const uploadImagePromise = upload_logo
      ? uploadFile(upload_logo, addbussinessImageName)
      : Promise.resolve();

    const uploadFooterImagePromise = footer_image
      ? uploadFile(footer_image, addbussinessfooterImageName)
      : Promise.resolve();

    // Wait for all file uploads to complete
    await Promise.all([
      uploadImagePromise,
      uploadFooterImagePromise,
    ]);

    // Create a new Customer object
    const newAddBussiness = new AddBussiness({
      upload_logo: addbussinessImageName, // Store the full image name
      customer_id,
      selected_category,
      bussiness_name,
      address,
      mobile_no,
      alternate_no,
      email,
      website,
      footer_image:addbussinessfooterImageName
    });

    // Save the customer to the database
    AddBussiness.createAddBussiness(newAddBussiness, (err, addbussiness) => {
      if (err) {
        console.error("Error creating addbussiness", err);
        return res.status(500).json({ error: "Failed to create addbussiness" });
      }

      // Create the image URLs
      const addbussinessImageUrl = getPresignedUrl(addbussinessImageName);
      const addbussinessfooterImageUrl = getPresignedUrl(addbussinessfooterImageName);

      // Add the image URLs to the customer object
      const addbussinessWithUrls = {
        ...addbussiness,
        upload_logo: addbussinessImageUrl,
        footer_image:addbussinessfooterImageUrl,
      };

      res.status(201).json({
        message: "addbussiness created successfully",
        addbussiness: addbussinessWithUrls,
      });
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    return res.status(500).json({ error: "Failed to upload files" });
  } finally {
    // Remove temporary files
    const { language_image, footer_image} = req.files;
    [language_image, footer_image].forEach((file) => {
      if (file && file.path) {
        fs.unlinkSync(file.path);
      }
    });
  }
};

exports.getAllAddBussiness = (req, res) => {
  AddBussiness.getAllAddBussiness((err, addbussiness) => {
    if (err) {
      console.error("Error retrieving addbussiness:", err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve addbussiness" });
    }
    // Create the image URLs for all customers
    const addbussinessWithUrls = addbussiness.map((addbussiness) => {
      const addbussinessImageUrl = getPresignedUrl(addbussiness.upload_logo);
      const addbussinessfooterImageUrl = getPresignedUrl(addbussiness.footer_image);

      return {
        ...addbussiness,
        upload_logo: addbussinessImageUrl,
        footer_image:addbussinessfooterImageUrl,
      };
    });
    res.status(200).json({ addbussiness: addbussinessWithUrls });
  });
};

exports.getAddBussinessById = (req, res) => {
  const AddBussinessId = req.params.id;

  AddBussiness.getAddBussinessById(AddBussinessId, (err, AddBussiness) => {
    if (err) {
      console.error("Error retrieving AddBussiness Id:", err);
      return res.status(500).json({  error: "Failed to retrieve AddBussiness Id" });
    }

    if (!AddBussiness || AddBussiness.length === 0) {
      return res.status(404).json({ message: "User Id not found" });
    }
    
    res.status(200).json({ AddBussiness });
  });
};

const getPresignedUrl = (fileName) => {
  if (fileName) {
    const encodedFileName = encodeURIComponent(fileName);
    console.log('Encoded file name:', encodedFileName);
    const url = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${encodedFileName}`;
    console.log('Full URL:', url);
    return url;
  } else {
    // Handle the case where fileName is null or empty
    return null; // You can choose to return a default URL or handle this case differently
  }
};


exports.updateAddBussiness = async (req, res) => {
  const addbussinessId = req.params.id;
  const updatedAddBussiness = {};

  try {
    if (req.body.status) {
      updatedAddBussiness.status = req.body.status;
    }
    if (req.body.selected_category) {
      updatedAddBussiness.selected_category = req.body.selected_category;
    }
    if (req.body.bussiness_name) {
      updatedAddBussiness.bussiness_name = req.body.bussiness_name;
    }
    if (req.body.address) {
      updatedAddBussiness.address = req.body.address;
    }
    if (req.body.mobile_no) {
      updatedAddBussiness.mobile_no = req.body.mobile_no;
    }
    if (req.body.alternate_no) {
      updatedAddBussiness.alternate_no = req.body.alternate_no;
    }
    if (req.body.email) {
      updatedAddBussiness.email = req.body.email;
    }
    if (req.body.website) {
      updatedAddBussiness.website = req.body.website;
    }

    const upload_logo = req.files['upload_logo'] ? req.files['upload_logo'][0] : null;
    const footer_image = req.files['footer_image'] ? req.files['footer_image'][0] : null;

    if (upload_logo) {
      const newAddBussinessImageName = `${uuidv4()}-${upload_logo.originalname}`;
      await uploadFile(upload_logo, newAddBussinessImageName);
      updatedAddBussiness.upload_logo = newAddBussinessImageName;
    }
    if (footer_image) {
      const newAddBussinessFooterImageName = `${uuidv4()}-${footer_image.originalname}`;
      await uploadFile(footer_image, newAddBussinessFooterImageName);
      updatedAddBussiness.footer_image = newAddBussinessFooterImageName;
    }

    if (Object.keys(updatedAddBussiness).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    AddBussiness.updateAddBussinessById(addbussinessId, updatedAddBussiness, (err, data) => {
      if (err) {
        console.error("Error updating addbussiness", err);
        return res.status(500).json({ error: "Failed to update addbussiness" });
      }

      const addbussinessImageUrl = updatedAddBussiness.upload_logo ? getPresignedUrl(updatedAddBussiness.upload_logo) : null;
      const addbussinessfooterImageUrl = updatedAddBussiness.footer_image ? getPresignedUrl(updatedAddBussiness.footer_image) : null;

      res.status(200).json({
        message: "AddBussiness updated successfully",
        upload_logo: addbussinessImageUrl,
        footer_image: addbussinessfooterImageUrl,
      });
    });
  } catch (error) {
    console.error("Error updating addbussiness:", error);
    return res.status(500).json({ error: "Failed to update addbussiness" });
  } finally {
    if (req.files) {
      if (req.files['upload_logo']) {
        req.files['upload_logo'].forEach(file => fs.unlinkSync(file.path));
      }
      if (req.files['footer_image']) {
        req.files['footer_image'].forEach(file => fs.unlinkSync(file.path));
      }
    }
  }
};

exports.deleteAddBussiness = (req, res) => {
  const addbussinessId = req.params.id;
  AddBussiness.deleteAddBussinessById(addbussinessId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found addbussiness with id " + addbussinessId + ".",
        });
      } else {
        res.status(500).send({
          message: "Could not delete addbussiness with id " + addbussinessId,
        });
      }
    } else res.send({ message: "addbussiness was deleted successfully!" });
  });
};


function uploadFile(file, fileName) {
  const fileContent = fs.readFileSync(file.path);

  const params = {
    Bucket: BUCKET,
    Key: fileName,
    Body: fileContent,
  };

  return s3.upload(params).promise();
}

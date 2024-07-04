const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const aws = require("aws-sdk");
const Marketplace = require("../models/Marketplace");
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

exports.Marketplace = async (req, res) => {
  try {
    // Extract data from request body
    const {
        service_name ,
        price_amount,
        about,
        tools_used,
        status,
    } = req.body;

    // Extract uploaded files
    const selected_image = req.files && req.files["selected_image"]
      ? req.files["selected_image"][0]
      : undefined;

    // Generate unique file names
    const marketplaceImageName = selected_image
      ? `${uuidv4()}-${selected_image.originalname}`
      : "none";

    // Upload files to AWS S3 bucket
    const uploadImagePromise = selected_image
      ? uploadFile(selected_image, marketplaceImageName)
      : Promise.resolve();
    // Wait for all file uploads to complete
    await Promise.all([
      uploadImagePromise,
    ]);

    // Create a new Customer object
    const newMarketplace = new Marketplace({
      selected_image: marketplaceImageName, // Store the full image name
      service_name,
      price_amount,
      about,
      tools_used,
      status,
    });

    // Save the customer to the database
    Marketplace.createMarketplace(newMarketplace, (err, marketplace) => {
      if (err) {
        console.error("Error creating marketplace", err);
        return res.status(500).json({ error: "Failed to create marketplace" });
      }

      // Create the image URLs
      const marketplaceImageUrl = getPresignedUrl(marketplaceImageName);

      // Add the image URLs to the customer object
      const marketplaceWithUrls = {
        ...marketplace,
        selected_image: marketplaceImageUrl,
      };

      res.status(201).json({
        message: "marketplace created successfully",
        marketplace: marketplaceWithUrls,
      });
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    return res.status(500).json({ error: "Failed to upload files" });
  } finally {
    // Remove temporary files
    const { selected_image } = req.files;
    [selected_image].forEach((file) => {
      if (file && file.path) {
        fs.unlinkSync(file.path);
      }
    });
  }
};

exports.getAllMarketplace = (req, res) => {
  Marketplace.getAllMarketplace((err, marketplace) => {
    if (err) {
      console.error("Error retrieving marketplace:", err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve marketplace" });
    }
    // Create the image URLs for all customers
    const marketplaceWithUrls = marketplace.map((marketplace) => {
      const marketplaceImageUrl = getPresignedUrl(marketplace.selected_image);

      return {
        ...marketplace,
        selected_image: marketplaceImageUrl,
      };
    });
    res.status(200).json({ marketplace: marketplaceWithUrls });
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


exports.updateMarketplace = async (req, res) => {
  const marketplaceId = req.params.id;
  const updatedMarketplace = {};

  try {
    // Update all possible fields that can be updated
    if (req.body.service_name) {
      updatedMarketplace.service_name = req.body.service_name;
    }
    if (req.body.price_amount) {
      updatedMarketplace.price_amount = req.body.price_amount;
    }
    if (req.body.about) {
      updatedMarketplace.about = req.body.about;
    }
    if (req.body.tools_used) {
      updatedMarketplace.tools_used = req.body.tools_used;
    }
    if (req.body.status) {
      updatedMarketplace.status = req.body.status;
    }

    const selected_image = req.file;

    if (selected_image) {
      const newMarketplaceImageName = `${uuidv4()}-${selected_image.originalname}`;
      await uploadFile(selected_image, newMarketplaceImageName);
      updatedMarketplace.selected_image = newMarketplaceImageName;
    }

    if (Object.keys(updatedMarketplace).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    Marketplace.updateMarketplaceById(marketplaceId, updatedMarketplace, (err, data) => {
      if (err) {
        console.error("Error updating marketplace", err);
        return res.status(500).json({ error: "Failed to update marketplace" });
      }

      const marketplaceImageUrl = updatedMarketplace.selected_image ? getPresignedUrl(updatedMarketplace.selected_image) : null;

      res.status(200).json({
        message: "marketplace updated successfully",
        selected_image: marketplaceImageUrl,
      });
    });
  } catch (error) {
    console.error("Error updating Marketplace:", error);
    return res.status(500).json({ error: "Failed to update Marketplace" });
  } finally {
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
  }
};


exports.deleteMarketplace = (req, res) => {
  const marketplaceId = req.params.id;
  Marketplace.deleteMarketplaceById(marketplaceId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found marketplace with id " + marketplaceId + ".",
        });
      } else {
        res.status(500).send({
          message: "Could not delete marketplace with id " + marketplaceId,
        });
      }
    } else res.send({ message: "marketplace was deleted successfully!" });
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
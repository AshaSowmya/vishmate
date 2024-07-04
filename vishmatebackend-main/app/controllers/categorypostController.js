const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const aws = require("aws-sdk");
const Categorypost = require("../models/Categorypost");
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

exports.addCategorypost = async (req, res) => {
  try {
    // Extract data from request body
    const {
        category_name,
        category_status,
    } = req.body;

    // Extract uploaded files
    const category_image = req.files && req.files["category_image"]
      ? req.files["category_image"][0]
      : undefined;

    // Generate unique file names
    const categorypostImageName = category_image
      ? `${uuidv4()}-${category_image.originalname}`
      : "none";

    // Upload files to AWS S3 bucket
    const uploadImagePromise = category_image
      ? uploadFile(category_image, categorypostImageName)
      : Promise.resolve();
    // Wait for all file uploads to complete
    await Promise.all([
      uploadImagePromise,
    ]);

    // Create a new Customer object
    const newCategorypost = new Categorypost({
        category_image: categorypostImageName, // Store the full image name
        category_name,
        category_status
    });

    // Save the customer to the database
    Categorypost.createCategorypost(newCategorypost, (err, categorypost) => {
      if (err) {
        console.error("Error creating categorypost", err);
        return res.status(500).json({ error: "Failed to create categorypost" });
      }

      // Create the image URLs
      const categorypostImageUrl = getPresignedUrl(categorypostImageName);

      // Add the image URLs to the customer object
      const categorypostWithUrls = {
        ...categorypost,
        category_image: categorypostImageUrl,
      };

      res.status(201).json({
        message: "categorypost created successfully",
        categorypost: categorypostWithUrls,
      });
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    return res.status(500).json({ error: "Failed to upload files" });
  } finally {
    // Remove temporary files
    const { category_image } = req.files;
    [category_image].forEach((file) => {
      if (file && file.path) {
        fs.unlinkSync(file.path);
      }
    });
  }
};

exports.getAllCategorypost = (req, res) => {
    Categorypost.getAllCategorypost((err, categorypost) => {
    if (err) {
      console.error("Error retrieving categorypost:", err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve categorypost" });
    }
    // Create the image URLs for all customers
    const categorypostWithUrls = categorypost.map((categorypost) => {
      const categorypostImageUrl = getPresignedUrl(categorypost.category_image);

      return {
        ...categorypost,
        category_image: categorypostImageUrl,
      };
    });
    res.status(200).json({ categorypost: categorypostWithUrls });
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


exports.updateCategorypost = async (req, res) => {
  const categorypostId = req.params.id;
  const updatedCategorypost = {};

  try {
    if (req.body.category_name) {
      updatedCategorypost.category_name = req.body.category_name;
    }
    if (req.body.category_status) {
      updatedCategorypost.category_status = req.body.category_status;
    }

    const category_image = req.file;

    if (category_image) {
      const newCategorypostImageName = `${uuidv4()}-${category_image.originalname}`;
      await uploadFile(category_image, newCategorypostImageName);
      updatedCategorypost.category_image = newCategorypostImageName;
    }

    if (Object.keys(updatedCategorypost).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    Categorypost.updateCategorypostById(categorypostId, updatedCategorypost, (err, data) => {
      if (err) {
        console.error("Error updating categorypost", err);
        return res.status(500).json({ error: "Failed to update categorypost" });
      }

      const categorypostImageUrl = updatedCategorypost.category_image ? getPresignedUrl(updatedCategorypost.category_image) : null;

      res.status(200).json({
        message: "Categorypost updated successfully",
        category_image: categorypostImageUrl,
      });
    });
  } catch (error) {
    console.error("Error updating categorypost:", error);
    return res.status(500).json({ error: "Failed to update categorypost" });
  } finally {
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.deleteCategorypost = (req, res) => {
  const categorypostId = req.params.id;
  Categorypost.deleteCategorypostById(categorypostId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found categorypost with id " + categorypostId + ".",
        });
      } else {
        res.status(500).send({
          message: "Could not delete categorypost with id " + categorypostId,
        });
      }
    } else res.send({ message: "categorypost was deleted successfully!" });
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

const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const aws = require("aws-sdk");
const Language = require("../models/Language");
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

exports.addLanguage = async (req, res) => {
  try {
    // Extract data from request body
    const {
        language_name,
        status,
    } = req.body;

    // Extract uploaded files
    const language_image = req.files && req.files["language_image"]
      ? req.files["language_image"][0]
      : undefined;

    // Generate unique file names
    const languageImageName = language_image
      ? `${uuidv4()}-${language_image.originalname}`
      : "none";

    // Upload files to AWS S3 bucket
    const uploadImagePromise = language_image
      ? uploadFile(language_image, languageImageName)
      : Promise.resolve();
    // Wait for all file uploads to complete
    await Promise.all([
      uploadImagePromise,
    ]);

    // Create a new Customer object
    const newLanguage = new Language({
        language_image: languageImageName, // Store the full image name
        language_name,
        status,
    });

    // Save the customer to the database
    Language.createLanguage(newLanguage, (err, language) => {
      if (err) {
        console.error("Error creating language", err);
        return res.status(500).json({ error: "Failed to create language" });
      }

      // Create the image URLs
      const languageImageUrl = getPresignedUrl(languageImageName);

      // Add the image URLs to the customer object
      const languageWithUrls = {
        ...language,
        language_image: languageImageUrl,
      };

      res.status(201).json({
        message: "language created successfully",
        language: languageWithUrls,
      });
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    return res.status(500).json({ error: "Failed to upload files" });
  } finally {
    // Remove temporary files
    const { language_image } = req.files;
    [language_image].forEach((file) => {
      if (file && file.path) {
        fs.unlinkSync(file.path);
      }
    });
  }
};

exports.getAllLanguage = (req, res) => {
  Language.getAllLanguage((err, language) => {
    if (err) {
      console.error("Error retrieving language:", err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve language" });
    }
    // Create the image URLs for all customers
    const languageWithUrls = language.map((language) => {
      const languageImageUrl = getPresignedUrl(language.language_image);

      return {
        ...language,
        language_image: languageImageUrl,
      };
    });
    res.status(200).json({ language: languageWithUrls });
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


exports.updateLanguage = async (req, res) => {
  const languageId = req.params.id;
  const updatedLanguage = {};
  
  try {
    if (req.body.status) {
      updatedLanguage.status = req.body.status;
    }
    if (req.body.language_name) {
      updatedLanguage.language_name = req.body.language_name;
    }

    const language_image = req.file;

    if (language_image) {
      const newLanguageImageName = `${uuidv4()}-${language_image.originalname}`;
      await uploadFile(language_image, newLanguageImageName);
      updatedLanguage.language_image = newLanguageImageName;
    }

    if (Object.keys(updatedLanguage).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    Language.updateLanguageById(languageId, updatedLanguage, (err, data) => {
      if (err) {
        console.error("Error updating language", err);
        return res.status(500).json({ error: "Failed to update language" });
      }

      const languageImageUrl = updatedLanguage.language_image ? getPresignedUrl(updatedLanguage.language_image) : null;

      res.status(200).json({
        message: "language updated successfully",
        language_image: languageImageUrl,
      });
    });
  } catch (error) {
    console.error("Error updating language:", error);
    return res.status(500).json({ error: "Failed to update language" });
  } finally {
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.deleteLanguage = (req, res) => {
  const languageId = req.params.id;
  Language.deleteLanguageById(languageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found language with id " + languageId + ".",
        });
      } else {
        res.status(500).send({
          message: "Could not delete language with id " + languageId,
        });
      }
    } else res.send({ message: "language was deleted successfully!" });
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
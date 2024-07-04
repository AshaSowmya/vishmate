// controllers/advertisementController.js
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const aws = require("aws-sdk");
const Advertisement = require("../models/Advertisement");
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

const s3 = new aws.S3();

const uploadFile = (file, fileName) => {
  const fileContent = fs.readFileSync(file.path);
  const params = {
    Bucket: BUCKET,
    Key: fileName,
    Body: fileContent,
  };
  return s3.upload(params).promise();
};

const getPresignedUrl = (fileName) => {
  if (fileName) {
    const encodedFileName = encodeURIComponent(fileName);
    const url = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${encodedFileName}`;
    return url;
  } else {
    return null;
  }
};

exports.addAdvertisement = async (req, res) => {
  try {
    const { status } = req.body;
    const photo = req.file;

    const advertisementImageName = photo
      ? `${uuidv4()}-${photo.originalname}`
      : "none";

    const uploadImagePromise = photo
      ? uploadFile(photo, advertisementImageName)
      : Promise.resolve();

    await Promise.all([
      uploadImagePromise,
    ]);

    const newAdvertisement = new Advertisement({
      photo: advertisementImageName,
      status
    });

    Advertisement.createAdvertisement(newAdvertisement, (err, advertisement) => {
      if (err) {
        console.error("Error creating advertisement", err);
        return res.status(500).json({ error: "Failed to create advertisement" });
      }

      const advertisementImageUrl = getPresignedUrl(advertisementImageName);

      const advertisementWithUrls = {
        ...advertisement,
        photo: advertisementImageUrl,
      };

      res.status(201).json({
        message: "advertisement created successfully",
        advertisement: advertisementWithUrls,
      });
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    return res.status(500).json({ error: "Failed to upload files" });
  } finally {
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.getAllAdvertisement = (req, res) => {
  Advertisement.getAllAdvertisement((err, advertisement) => {
    if (err) {
      console.error("Error retrieving advertisement:", err);
      return res.status(500).json({ error: "Failed to retrieve advertisement" });
    }
    const advertisementWithUrls = advertisement.map((advertisement) => {
      const advertisementImageUrl = getPresignedUrl(advertisement.photo);
      return {
        ...advertisement,
        photo: advertisementImageUrl,
      };
    });
    res.status(200).json({ advertisement: advertisementWithUrls });
  });
};

exports.updateAdvertisement = async (req, res) => {
  const advertisementId = req.params.id;
  const updatedAdvertisement = {};

  try {
    if (req.body.status) {
      updatedAdvertisement.status = req.body.status;
    }

    const photo = req.file;

    if (photo) {
      const newAdvertisementImageName = `${uuidv4()}-${photo.originalname}`;
      await uploadFile(photo, newAdvertisementImageName);
      updatedAdvertisement.photo = newAdvertisementImageName;
    }

    if (Object.keys(updatedAdvertisement).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    Advertisement.updateAdvertisementById(advertisementId, updatedAdvertisement, (err, data) => {
      if (err) {
        console.error("Error updating advertisement", err);
        return res.status(500).json({ error: "Failed to update advertisement" });
      }

      const advertisementImageUrl = updatedAdvertisement.photo ? getPresignedUrl(updatedAdvertisement.photo) : null;

      res.status(200).json({
        message: "Advertisement updated successfully",
        photo: advertisementImageUrl,
      });
    });
  } catch (error) {
    console.error("Error updating advertisement:", error);
    return res.status(500).json({ error: "Failed to update advertisement" });
  } finally {
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.deleteAdvertisement = (req, res) => {
  const advertisementId = req.params.id;
  Advertisement.deleteAdvertisementById(advertisementId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found advertisement with id " + advertisementId + ".",
        });
      } else {
        res.status(500).send({
          message: "Could not delete advertisement with id " + advertisementId,
        });
      }
    } else res.send({ message: "advertisement was deleted successfully!" });
  });
};

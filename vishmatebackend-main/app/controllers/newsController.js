const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const aws = require("aws-sdk");
const News = require("../models/News");
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

exports.News = async (req, res) => {
  try {
    // Extract data from request body
    const {
        heading ,
        tagline,
        status,
    } = req.body;

    // Extract uploaded files
    const news_image = req.files && req.files["news_image"]
      ? req.files["news_image"][0]
      : undefined;

    // Generate unique file names
    const newsImageName = news_image
      ? `${uuidv4()}-${news_image.originalname}`
      : "none";

    // Upload files to AWS S3 bucket
    const uploadImagePromise = news_image
      ? uploadFile(news_image, newsImageName)
      : Promise.resolve();
    // Wait for all file uploads to complete
    await Promise.all([
      uploadImagePromise,
    ]);

    // Create a new Customer object
    const newNews = new News({
      news_image: newsImageName, // Store the full image name
      heading,
      tagline,
      status
    });

    // Save the customer to the database
    News.createNews(newNews, (err, news) => {
      if (err) {
        console.error("Error creating news", err);
        return res.status(500).json({ error: "Failed to create news" });
      }

      // Create the image URLs
      const newsImageUrl = getPresignedUrl(newsImageName);

      // Add the image URLs to the customer object
      const newsWithUrls = {
        ...news,
        news_image: newsImageUrl,
      };

      res.status(201).json({
        message: "news created successfully",
        news: newsWithUrls,
      });
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    return res.status(500).json({ error: "Failed to upload files" });
  } finally {
    // Remove temporary files
    const { news_image } = req.files;
    [news_image].forEach((file) => {
      if (file && file.path) {
        fs.unlinkSync(file.path);
      }
    });
  }
};

exports.getAllNews = (req, res) => {
    News.getAllNews((err, news) => {
    if (err) {
      console.error("Error retrieving news:", err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve news" });
    }
    // Create the image URLs for all customers
    const newsWithUrls = news.map((news) => {
      const newsImageUrl = getPresignedUrl(news.news_image);

      return {
        ...news,
        news_image: newsImageUrl,
      };
    });
    res.status(200).json({ news: newsWithUrls });
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


exports.updateNews = async (req, res) => {
  const newsId = req.params.id;
  const updatedNews = {};

  try {
    if (req.body.status) {
      updatedNews.status = req.body.status;
    }
    if (req.body.heading) {
      updatedNews.heading = req.body.heading;
    }
    if (req.body.tagline) {
      updatedNews.tagline = req.body.tagline;
    }
   
    const news_image = req.file;

    if (news_image) {
      const newNewsImageName = `${uuidv4()}-${news_image.originalname}`;
      await uploadFile(news_image, newNewsImageName);
      updatedNews.news_image = newNewsImageName;
    }

    if (Object.keys(updatedNews).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    News.updateNewsById(newsId, updatedNews, (err, data) => {
      if (err) {
        console.error("Error updating news", err);
        return res.status(500).json({ error: "Failed to update news" });
      }

      const newsImageUrl = updatedNews.news_image ? getPresignedUrl(updatedNews.news_image) : null;

      res.status(200).json({
        message: "news updated successfully",
        news_image: newsImageUrl,
      });
    });
  } catch (error) {
    console.error("Error updating news:", error);
    return res.status(500).json({ error: "Failed to update news" });
  } finally {
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
  }
};


exports.deleteNews = (req, res) => {
  const newsId = req.params.id;
  News.deleteNewsById(newsId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found news with id " + newsId + ".",
        });
      } else {
        res.status(500).send({
          message: "Could not delete news with id " + newsId,
        });
      }
    } else res.send({ message: "news was deleted successfully!" });
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
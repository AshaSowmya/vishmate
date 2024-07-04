const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const aws = require("aws-sdk");
const Categoryframe = require("../models/Categoryframe");
require('dotenv').config();
//const { uploadFile, getPresignedUrl } = require('../utils/s3');

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

exports.addCategoryframe = async (req, res) => {
  try {
    // Extract data from request body
    const {
      category_type,
      sub_category1,
      sub_category2,
      title,
      language,
      color_code,
      font_style,
      font_size,
      logo_x,
      logo_y,
      date_x,
      date_y,
      footer_x,
      footer_y,
      footer1_x,
      footer1_y,
      gold_x,
      gold_y,
      silver_x,
      silver_y,
      status,
    } = req.body;

    // Extract uploaded files
    const frame_image = req.files && req.files["frame_image"]
      ? req.files["frame_image"][0]
      : undefined;
    // const footer_image = req.files && req.files["footer_image"]
    //   ? req.files["footer_image"][0]
    //   : undefined;

    // Generate unique file names
    const categoryframeImageName = frame_image
      ? `${uuidv4()}-${frame_image.originalname}`
      : "none";
    // const footerImageName = footer_image
    //   ? `${uuidv4()}-${footer_image.originalname}`
    //   : "none";

    // Upload files to AWS S3 bucket
    const uploadImagePromise = frame_image
      ? uploadFile(frame_image, categoryframeImageName)
      : Promise.resolve();
    // const uploadImagePromise1 = footer_image
    //   ? uploadFile(footer_image, footerImageName)
    //   : Promise.resolve();

    // Wait for all file uploads to complete
    await Promise.all([
      uploadImagePromise,
      // uploadImagePromise1,
    ]);

    // Create a new Customer object
    const newCategoryframe = new Categoryframe({
      frame_image: categoryframeImageName, // Store the full image name
      category_type,
      sub_category1,
      sub_category2,
      title,
      language,
      color_code,
      font_style,
      font_size,
      // footer_image: footerImageName,
      logo_x,
      logo_y,
      date_x,
      date_y,
      footer_x,
      footer_y,
      footer1_x,
      footer1_y,
      gold_x,
      gold_y,
      silver_x,
      silver_y,
      status,
    });

    // Save the customer to the database
    Categoryframe.createCategoryframe(newCategoryframe, (err, categoryframe) => {
      if (err) {
        console.error("Error creating categoryframe", err);
        return res.status(500).json({ error: "Failed to create categoryframe" });
      }

      // Create the image URLs
      const categoryframeImageUrl = getPresignedUrl(categoryframeImageName);
     // const categoryframe1ImageUrl = getPresignedUrl(footerImageName);

      // Add the image URLs to the customer object
      const categoryframeWithUrls = {
        ...categoryframe,
        frame_image: categoryframeImageUrl,
       // footer_image: categoryframe1ImageUrl,
      };

      res.status(201).json({
        message: "categoryframe created successfully",
        categoryframe: categoryframeWithUrls,
      });
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    return res.status(500).json({ error: "Failed to upload files" });
  } finally {
    // Remove temporary files
    const { frame_image } = req.files;
    [frame_image].forEach((file) => {
      if (file && file.path) {
        fs.unlinkSync(file.path);
      }
    });
  }
};

exports.getCategoryframeById = (req, res) => {
  const CategoryframeId = req.params.id;

  Categoryframe.getCategoryframeById(CategoryframeId, (err, Categoryframe) => {
    if (err) {
      console.error("Error retrieving Categoryframe Id:", err);
      return res.status(500).json({  error: "Failed to retrieve Categoryframe Id" });
    }

    if (!Categoryframe || Categoryframe.length === 0) {
      return res.status(404).json({ message: "Categoryframe Id not found" });
    }
    
    res.status(200).json({ Categoryframe });
  });
};


exports.getAllCategoryframe = (req, res) => {
  Categoryframe.getAllCategoryframe((err, categoryframe) => {
    if (err) {
      console.error("Error retrieving categoryframe:", err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve categoryframe" });
    }
    // Create the image URLs for all customers
    const categoryframeWithUrls = categoryframe.map((categoryframe) => {
      const categoryframeImageUrl = getPresignedUrl(categoryframe.frame_image);
     // const categoryframe1ImageUrl = getPresignedUrl(categoryframe.footer_image);
      return {
        ...categoryframe,
        frame_image: categoryframeImageUrl,
     //   footer_image: categoryframe1ImageUrl,
      };
    });
    res.status(200).json({ categoryframe: categoryframeWithUrls });
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
    return null; // You can choose to return a default URL or handle this case differently
  }
};

exports.updateCategoryframe = async (req, res) => {
  const categoryframeId = req.params.id;
  const updatedCategoryframe = {};

  try {
    if (req.body.status) {
      updatedCategoryframe.status = req.body.status;
    }
    if (req.body.category_type) {
      updatedCategoryframe.category_type = req.body.category_type;
    }
    if (req.body.sub_category1) {
      updatedCategoryframe.sub_category1 = req.body.sub_category1;
    }
    if (req.body.sub_category2) {
      updatedCategoryframe.sub_category2 = req.body.sub_category2;
    }
    if (req.body.title) {
      updatedCategoryframe.title = req.body.title;
    }
    if (req.body.language) {
      updatedCategoryframe.language = req.body.language;
    }
    if (req.body.color_code) {
      updatedCategoryframe.color_code = req.body.color_code;
    }
    if (req.body.font_style) {
      updatedCategoryframe.font_style = req.body.font_style;
    }
    if (req.body.font_size) {
      updatedCategoryframe.font_size = req.body.font_size;
    }
    if (req.body.logo_x) {
      updatedCategoryframe.logo_x = req.body.logo_x;
    }
    if (req.body.logo_y) {
      updatedCategoryframe.logo_y = req.body.logo_y;
    }
    if (req.body.date_x) {
      updatedCategoryframe.date_x = req.body.date_x;
    }
    if (req.body.date_y) {
      updatedCategoryframe.date_y = req.body.date_y;
    }
    if (req.body.footer_x) {
      updatedCategoryframe.footer_x = req.body.footer_x;
    }
    if (req.body.footer_y) {
      updatedCategoryframe.footer_y = req.body.footer_y;
    }
    if (req.body.footer1_x) {
      updatedCategoryframe.footer1_x = req.body.footer1_x;
    }
    if (req.body.footer1_y) {
      updatedCategoryframe.footer1_y = req.body.footer1_y;
    }
    if (req.body.gold_x) {
      updatedCategoryframe.gold_x = req.body.gold_x;
    }
    if (req.body.gold_y) {
      updatedCategoryframe.gold_y = req.body.gold_y;
    }
    if (req.body.silver_x) {
      updatedCategoryframe.silver_x = req.body.silver_x;
    }
    if (req.body.silver_y) {
      updatedCategoryframe.silver_y = req.body.silver_y;
    }
    if (req.body.title) {
      updatedCategoryframe.title = req.body.title;
    }

    if (req.files && req.files['frame_image'] && req.files['frame_image'][0].path) {
      const frame_image = req.files['frame_image'][0]; // Accessing the first file uploaded
      console.log("Frame image object:", frame_image); // Log the file object for debugging
      const newCategoryframeImageName = `${uuidv4()}-${frame_image.originalname}`;
      await uploadFile(frame_image, newCategoryframeImageName); // Pass the entire file object
      updatedCategoryframe.frame_image = newCategoryframeImageName;
      
      // Clean up temporary file after upload
      fs.unlinkSync(frame_image.path);
    }

    // Check if there are fields to update
    if (Object.keys(updatedCategoryframe).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    // Update the categoryframe in the database
    Categoryframe.updateCategoryframeById(categoryframeId, updatedCategoryframe, (err, data) => {
      if (err) {
        console.error("Error updating categoryframe", err);
        return res.status(500).json({ error: "Failed to update categoryframe", details: err.message || err });
      }

      // Create the image URLs if new images were uploaded
      const frameImageUrl = updatedCategoryframe.frame_image ? getPresignedUrl(updatedCategoryframe.frame_image) : null;

      res.status(200).json({
        message: "Categoryframe updated successfully",
        frame_image: frameImageUrl,
      });
    });
  } catch (error) {
    console.error("Error updating categoryframe:", error);
    return res.status(500).json({ error: "Failed to update categoryframe", details: error.message || error });
  }
};

exports.bulkUpdateStatus = (req, res) => {
  const { updates } = req.body;

  if (!updates || !Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({ message: "Invalid update data" });
  }

  Categoryframe.bulkUpdateStatus(updates, (err, result) => {
    if (err) {
      console.error("Error updating categoryframe statuses:", err);
      return res.status(500).json({ error: "Failed to update categoryframe statuses" });
    }

    res.status(200).json({ message: "Categoryframe statuses updated successfully", result });
  });
};



exports.deleteCategoryframe = (req, res) => {
  const categoryframeId = req.params.id;
  Categoryframe.deleteCategoryframeById(categoryframeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found masterproduct with id " + categoryframeId + ".",
        });
      } else {
        res.status(500).send({
          message: "Could not delete masterproduct with id " + categoryframeId,
        });
      }
    } else res.send({ message: "masterproduct was deleted successfully!" });
  });
};

exports.bulkDelete = (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "Invalid delete data" });
  }

  Categoryframe.bulkDelete(ids, (err, result) => {
    if (err) {
      console.error("Error deleting categoryframe:", err);
      return res.status(500).json({ error: "Failed to delete categoryframe" });
    }

    res.status(200).json({ message: "Categoryframe deleted successfully", result });
  });
};

function uploadFile(file, fileName) {
  console.log("File object:", file); // Log the file object for debugging
  const fileContent = fs.readFileSync(file.path);

  const params = {
    Bucket: BUCKET,
    Key: fileName,
    Body: fileContent,
  };

  return s3.upload(params).promise();
}

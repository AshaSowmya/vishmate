// models/Advertisement.js
const mysql = require('mysql');
const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const Advertisement = function (advertisement) {
  this.photo = advertisement.photo;
  this.status = advertisement.status;
};

Advertisement.createAdvertisement = function (newAdvertisement, result) {
  connection.query('INSERT INTO advertisement SET ?', newAdvertisement, (error, res) => {
    if (error) {
      console.log('Error in creating advertisement: ', error);
      result(error, null);
    } else {
      console.log('Advertisement created successfully');
      result(null, res.insertId);
    }
  });
};

Advertisement.getAllAdvertisement = function (callback) {
  connection.query('SELECT * FROM advertisement', (error, rows) => {
    if (error) {
      console.log('Error in retrieving advertisement: ', error);
      return callback(error, null);
    }
    callback(null, rows);
  });
};

Advertisement.updateAdvertisementById = function (advertisementId, updatedAdvertisement, result) {
  const fields = Object.keys(updatedAdvertisement).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updatedAdvertisement);
  values.push(advertisementId);
  const query = `UPDATE advertisement SET ${fields} WHERE advertisement_id = ?`;
  connection.query(query, values, (error, res) => {
    if (error) {
      console.log("Error in updating advertisement: ", error);
      result(error, null);
    } else {
      console.log("Advertisement updated successfully");
      result(null, res);
    }
  });
};

Advertisement.deleteAdvertisementById = function (advertisementId, result) {
  connection.query(
    "DELETE FROM advertisement WHERE advertisement_id = ?",
    [advertisementId],
    (error, res) => {
      if (error) {
        console.log("Error in deleting advertisement: ", error);
        result(error, null);
      } else {
        console.log("Advertisement deleted successfully");
        result(null, res);
      }
    }
  );
};

module.exports = Advertisement;
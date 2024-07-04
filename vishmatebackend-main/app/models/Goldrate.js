const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const Goldrate = function (goldrate) {
    this.time = goldrate.time;
    this.location = goldrate.location;
    this.goldrate = goldrate.goldrate;
    this.silverrate = goldrate.silverrate;
};


Goldrate.createGoldrate = function (newGoldrate, result) {
    Object.keys(newGoldrate).forEach((key) => {
        if (newGoldrate[key] === "") {
          newGoldrate[key] = "none";
        }
      });
    connection.query('INSERT INTO goldrate SET ?', newGoldrate, (error, res) => {
        if (error) {
            console.log('Error in creating goldrate: ', error);
            result(error, null);
        } else {
            console.log('goldrate created successfully');
            result(null, res.insertId);
        }
    });

};

Goldrate.getAllGoldrate = function (callback) {
    connection.query('SELECT * FROM goldrate', (error, rows) => {
        if (error) {
            console.log('Error in retrieving goldrate: ', error);
            return callback(error, null);
        }
        callback(null, rows);
    });
};


Goldrate.updateGoldrateById = function (GoldrateId, updatedGoldrate, result) {
  Object.keys(updatedGoldrate).forEach((key) => {
      if (updatedGoldrate[key] === "") {
          updatedGoldrate[key] = "none";
      }
  });
  connection.query(
      "UPDATE goldrate SET ? WHERE goldrate_id  = ?",
      [updatedGoldrate, GoldrateId],
      (error, res) => {
          if (error) {
              console.log("Error in updating goldrate: ", error);
              result(error, null);
          } else {
              console.log("goldrate updated successfully");
              result(null, res);
          }
      }
  );
};


Goldrate.deleteGoldrateById = function (GoldrateId, result) {
    connection.query(
        "DELETE FROM goldrate WHERE goldrate_id  = ?",
        [GoldrateId],
        (error, res) => {
            if (error) {
                console.log("Error in deleting goldrate: ", error);
                result(error, null);
            } else {
                console.log("goldrate deleted successfully");
                result(null, res);
            }
        }
    );
};

module.exports = Goldrate;
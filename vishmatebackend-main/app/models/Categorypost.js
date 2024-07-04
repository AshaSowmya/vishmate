const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const Categorypost = function (categorypost) {
    this.category_image = categorypost.category_image;
    this.category_name = categorypost.category_name;
    this.category_status = categorypost.category_status;
};


Categorypost.createCategorypost = function (newCategorypost, result) {
    Object.keys(newCategorypost).forEach((key) => {
        if (newCategorypost[key] === "") {
          newCategorypost[key] = "none";
        }
      });
    connection.query('INSERT INTO category_post SET ?', newCategorypost, (error, res) => {
        if (error) {
            console.log('Error in creating categorypost: ', error);
            result(error, null);
        } else {
            console.log('categorypost created successfully');
            result(null, res.insertId);
        }
    });

};

Categorypost.getAllCategorypost = function (callback) {
    connection.query('SELECT * FROM category_post', (error, rows) => {
        if (error) {
            console.log('Error in retrieving categorypost: ', error);
            return callback(error, null);
        }
        callback(null, rows);
    });
};


Categorypost.updateCategorypostById = function (categorypostId, updatedCategorypost, result) {
    const fields = Object.keys(updatedCategorypost).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updatedCategorypost);
    values.push(categorypostId);
    const query = `UPDATE category_post SET ${fields} WHERE category_id = ?`;
    connection.query(query, values, (error, res) => {
      if (error) {
        console.log("Error in updating categorypost: ", error);
        result(error, null);
      } else {
        console.log("categorypost updated successfully");
        result(null, res);
      }
    });
  };


Categorypost.deleteCategorypostById = function (CategorypostId, result) {
    connection.query(
        "DELETE FROM category_post WHERE category_id = ?",
        [CategorypostId],
        (error, res) => {
            if (error) {
                console.log("Error in deleting categorypost: ", error);
                result(error, null);
            } else {
                console.log("categorypost deleted successfully");
                result(null, res);
            }
        }
    );
};

module.exports = Categorypost;
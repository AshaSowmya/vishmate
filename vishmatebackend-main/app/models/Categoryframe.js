const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const Categoryframe = function (categoryframe) {
    this.category_type = categoryframe.category_type;
    this.sub_category1 = categoryframe.sub_category1;
    this.sub_category2 = categoryframe.sub_category2;
    this.title = categoryframe.title;
    this.language = categoryframe.language;
    this.frame_image = categoryframe.frame_image;
    this.color_code = categoryframe.color_code;
    this.font_style = categoryframe.font_style;
    this.font_size = categoryframe.font_size;
    this.logo_x = categoryframe.logo_x;
    this.logo_y = categoryframe.logo_y;
    this.date_x = categoryframe.date_x;
    this.date_y = categoryframe.date_y;
    this.footer_x = categoryframe.footer_x;
    this.footer_y = categoryframe.footer_y;
    this.footer1_x = categoryframe.footer1_x;
    this.footer1_y = categoryframe.footer1_y;
    this.gold_x = categoryframe.gold_x;
    this.gold_y = categoryframe.gold_y;
    this.silver_x = categoryframe.silver_x;
    this.silver_y = categoryframe.silver_y;
    this.status = categoryframe.status;
};


Categoryframe.createCategoryframe = function (newCategoryframe, result) {
    Object.keys(newCategoryframe).forEach((key) => {
        if (newCategoryframe[key] === "") {
            newCategoryframe[key] = "none";
        }
    });
    connection.query('INSERT INTO category_frame SET ?', newCategoryframe, (error, res) => {
        if (error) {
            console.log('Error in creating categoryframe: ', error);
            result(error, null);
        } else {
            console.log('categoryframe created successfully');
            result(null, res.insertId);
        }
    });

};

Categoryframe.getAllCategoryframe = function (callback) {
    connection.query('SELECT * FROM category_frame', (error, rows) => {
        if (error) {
            console.log('Error in retrieving categoryframe: ', error);
            return callback(error, null);
        }
        callback(null, rows);
    });
};

Categoryframe.getCategoryframeById = function (CategoryframeId, result) {
    connection.query(
        "SELECT * FROM category_frame WHERE categoryframe_id  = ?",
        CategoryframeId,
        (error, rows) => {
            if (error) {
                console.log("Error in retrieving Categoryframe Id: ", error);
                result(error, null);
            } else {
                result(null, rows); // Return all rows matching the room_type
            }
        }
    );
};


Categoryframe.updateCategoryframeById = function (categoryframeId, updatedCategoryframe, result) {
    const fields = Object.keys(updatedCategoryframe).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updatedCategoryframe);
    values.push(categoryframeId);
    const query = `UPDATE category_frame SET ${fields} WHERE categoryframe_id = ?`;
    connection.query(query, values, (error, res) => {
      if (error) {
        console.log("Error in updating categoryframe: ", error);
        result(error, null);
      } else {
        console.log("categoryframe updated successfully");
        result(null, res);
      }
    });
  };

  Categoryframe.bulkUpdateStatus = function (updates, result) {
    connection.beginTransaction((err) => {
      if (err) {
        console.log("Error in starting transaction: ", err);
        return result(err, null);
      }
  
      const queries = updates.map(({ categoryframe_id, status }) => {
        return mysql.format('UPDATE category_frame SET status = ? WHERE categoryframe_id = ?', [status, categoryframe_id]);
      });
  
      Promise.all(
        queries.map(query => new Promise((resolve, reject) => {
          connection.query(query, (error, res) => {
            if (error) {
              return reject(error);
            }
            resolve(res);
          });
        }))
      )
      .then(() => {
        connection.commit((commitErr) => {
          if (commitErr) {
            return connection.rollback(() => {
              console.log("Error in committing transaction: ", commitErr);
              result(commitErr, null);
            });
          }
          console.log("Bulk categoryframe statuses updated successfully");
          result(null, { message: "Bulk update successful" });
        });
      })
      .catch((transactionError) => {
        connection.rollback(() => {
          console.log("Error in transaction: ", transactionError);
          result(transactionError, null);
        });
      });
    });
  };
  
Categoryframe.deleteCategoryframeById = function (CategoryframeId, result) {
    connection.query(
        "DELETE FROM category_frame WHERE categoryframe_id  = ?",
        [CategoryframeId],
        (error, res) => {
            if (error) {
                console.log("Error in deleting categoryframe: ", error);
                result(error, null);
            } else {
                console.log("categoryframe deleted successfully");
                result(null, res);
            }
        }
    );
};

Categoryframe.bulkDelete = function (categoryframeIds, result) {
  const placeholders = categoryframeIds.map(() => '?').join(',');
  const query = `DELETE FROM category_frame WHERE categoryframe_id IN (${placeholders})`;
  
  connection.query(query, categoryframeIds, (error, res) => {
    if (error) {
      console.log("Error in bulk deleting categoryframe: ", error);
      result(error, null);
    } else {
      console.log("Bulk categoryframe deleted successfully");
      result(null, res);
    }
  });
};

module.exports = Categoryframe;

const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const AddBussiness = function (addbussiness) {
    this.customer_id = addbussiness.customer_id;
    this.upload_logo = addbussiness.upload_logo;
    this.footer_image = addbussiness.footer_image;
    this.selected_category = addbussiness.selected_category;
    this.bussiness_name = addbussiness.bussiness_name;
    this.address = addbussiness.address;
    this.mobile_no = addbussiness.mobile_no;
    this.alternate_no = addbussiness.alternate_no;
    this.email = addbussiness.email;
    this.website = addbussiness.website;
};


AddBussiness.createAddBussiness = function (newAddBussiness, result) {
    Object.keys(newAddBussiness).forEach((key) => {
        if (newAddBussiness[key] === "") {
          newAddBussiness[key] = "none";
        }
      });
    connection.query('INSERT INTO add_bussiness SET ?', newAddBussiness, (error, res) => {
        if (error) {
            console.log('Error in creating addbussiness: ', error);
            result(error, null);
        } else {
            console.log('Addbussiness created successfully');
            result(null, res.insertId);
        }
    });

};

AddBussiness.getAllAddBussiness = function (callback) {
    connection.query('SELECT * FROM add_bussiness', (error, rows) => {
        if (error) {
            console.log('Error in retrieving addbussiness: ', error);
            return callback(error, null);
        }
        callback(null, rows);
    });
};

AddBussiness.getAddBussinessById = function (AddBussinessId, result) {
    connection.query(
      "SELECT * FROM add_bussiness WHERE customer_id = ?",
      AddBussinessId,
      (error, rows) => {
        if (error) {
          console.log("Error in retrieving AddBussiness Id: ", error);
          result(error, null);
        } else {
          result(null, rows); // Return all rows matching the room_type
        }
      }
    );
};

AddBussiness.updateAddBussinessById = function (addbussinessId, updatedAddBussiness, result) {
    const fields = Object.keys(updatedAddBussiness).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updatedAddBussiness);
    values.push(addbussinessId);
    const query = `UPDATE add_bussiness SET ${fields} WHERE bussiness_id = ?`;
    connection.query(query, values, (error, res) => {
      if (error) {
        console.log("Error in updating addbussiness: ", error);
        result(error, null);
      } else {
        console.log("addbussiness updated successfully");
        result(null, res);
      }
    });
  };


AddBussiness.deleteAddBussinessById = function (AddBussinessId, result) {
    connection.query(
        "DELETE FROM add_bussiness WHERE bussiness_id  = ?",
        [AddBussinessId],
        (error, res) => {
            if (error) {
                console.log("Error in deleting addbussiness: ", error);
                result(error, null);
            } else {
                console.log("addbussiness deleted successfully");
                result(null, res);
            }
        }
    );
};

module.exports = AddBussiness;

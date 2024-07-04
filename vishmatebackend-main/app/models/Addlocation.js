const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const Addlocation = function (addlocation) {
    this.addlocation = addlocation.addlocation;
};

Addlocation.createAddlocation = function (newAddlocation, result) {
    Object.keys(newAddlocation).forEach((key) => {
        if (newAddlocation[key] === "") {
            newAddlocation[key] = "none";
        }
    });
    connection.query('INSERT INTO addlocation SET ?', newAddlocation, (error, res) => {
        if (error) {
            console.log('Error in creating addlocation: ', error);
            result(error, null);
        } else {
            console.log('addlocation created successfully');
            result(null, { addlocation_id: res.insertId });
        }
    });
};

Addlocation.getAllAddlocation = function (callback) {
    connection.query('SELECT * FROM addlocation', (error, rows) => {
        if (error) {
            console.log('Error in retrieving addlocation: ', error);
            return callback(error, null);
        }
        callback(null, rows);
    });
};

Addlocation.updateAddlocationById = function (addlocationId, updatedaddlocation, result) {
    Object.keys(updatedaddlocation).forEach((key) => {
        if (updatedaddlocation[key] === "") {
            updatedaddlocation[key] = "none";
        }
    });
    connection.query(
        "UPDATE addlocation SET ? WHERE addlocation_id  = ?",
        [updatedaddlocation, addlocationId],
        (error, res) => {
            if (error) {
                console.log("Error in updating addlocation: ", error);
                result(error, null);
            } else {
                console.log("addlocation updated successfully");
                result(null, { addlocation_id: addlocationId, ...updatedaddlocation });
            }
        }
    );
};

Addlocation.deleteAddlocationById = function (AddlocationId, result) {
    connection.query(
        "DELETE FROM addlocation WHERE addlocation_id  = ?",
        [AddlocationId],
        (error, res) => {
            if (error) {
                console.log("Error in deleting addlocation: ", error);
                result(error, null);
            } else {
                console.log("addlocation deleted successfully");
                result(null, res);
            }
        }
    );
};

module.exports = Addlocation;
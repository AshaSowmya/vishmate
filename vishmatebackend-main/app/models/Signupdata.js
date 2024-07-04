const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const Signupdata = function (signupdata) {
    this.name = signupdata.name;
    this.mobilenumber = signupdata.mobilenumber;
    this.email = signupdata.email;
};

Signupdata.createSignupdata = function (newSignupdata, result) {
    connection.query('INSERT INTO signupdata SET ?', newSignupdata, (error, res) => {
        if (error) {
            console.log('Error in creating signupdata: ', error);
            result(error, null);
        } else {
            console.log('signupdata created successfully');
            result(null, res.insertId);
        }
    });
};

Signupdata.getAllSignupdata = function (callback) {
    connection.query('SELECT * FROM signupdata', (error, rows) => {
        if (error) {
            console.log('Error in retrieving signupdata: ', error);
            return callback(error, null);
        }

        callback(null, rows);
    });
};

Signupdata.updateSignupdataById = function (SignupdataId, updatedSignupdata, result) {
    Object.keys(updatedSignupdata).forEach((key) => {
        if (updatedSignupdata[key] === "") {
            updatedSignupdata[key] = "none";
        }
    });
    connection.query(
        "UPDATE signupdata SET ? WHERE signupdata_id  = ?",
        [updatedSignupdata, SignupdataId],
        (error, res) => {
            if (error) {
                console.log("Error in updating Signupdata: ", error);
                result(error, null);
            } else {
                console.log("Signupdata updated successfully");
                result(null, res);
            }
        }
    );
};

Signupdata.deleteSignupdataById = function (SignupdataId, result) {
    connection.query(
        "DELETE FROM signupdata WHERE signupdata_id  = ?",
        [SignupdataId],
        (error, res) => {
            if (error) {
                console.log("Error in deleting signupdata: ", error);
                result(error, null);
            } else {
                console.log("signupdata deleted successfully");
                result(null, res);
            }
        }
    );
};

module.exports = Signupdata;
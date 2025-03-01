const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const UserLog = function (userlog) {
    this.name = userlog.name;
    this.loginTime = userlog.loginTime;
    this.ip_address=userlog.ip_address;
};

UserLog.createUserLog = function (newUserLog, result) {
    Object.keys(newUserLog).forEach((key) => {
        if (newUserLog[key] === "") {
            newUserLog[key] = "none";
        }
    });

    connection.query('INSERT INTO userlog SET ?', newUserLog, (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res.insertId);
        }
    });
};

UserLog.getAllUserLog = function (callback) {
    connection.query('SELECT * FROM userlog', (error, rows) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, rows);
    });
};

UserLog.updateUserLogById = function (userlogId, updatedUserLog, result) {
    Object.keys(updatedUserLog).forEach((key) => {
        if (updatedUserLog[key] === "") {
            updatedUserLog[key] = "none";
        }
    });

    connection.query(
        "UPDATE userlog SET ? WHERE log_id = ?",
        [updatedUserLog, userlogId],
        (error, res) => {
            if (error) {
                result(error, null);
            } else {
                result(null, res);
            }
        }
    );
};

module.exports = UserLog;
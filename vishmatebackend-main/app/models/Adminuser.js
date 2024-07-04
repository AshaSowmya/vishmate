const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const Adminuser = function (adminuser) {
  this.user_name = adminuser.user_name;
  this.admin_email = adminuser.admin_email;
  this.password = adminuser.password;
  this.category = adminuser.category;
};

Adminuser.createAdminuser = function (newAdminuser, result) {
  bcrypt.hash(newAdminuser.password, 10, (err, hash) => {
    if (err) {
      console.error("Error in hashing password: ", err);
      return result(err, null);
    }
    newAdminuser.password = hash;
    Object.keys(newAdminuser).forEach((key) => {
      if (newAdminuser[key] === "") {
        newAdminuser[key] = "none";
      }
    });
    connection.query("INSERT INTO admin_user SET ?", newAdminuser, (error, res) => {
      if (error) {
        console.error("Error in creating user: ", error);
        result(error, null);
      } else {
        console.log("User created successfully");
        result(null, res.insertId);
      }
    });
  });
};

Adminuser.getAllAdminuser = function (result) {
  connection.query("SELECT * FROM admin_user", (error, res) => {
    if (error) {
      console.error("Error in retrieving all users: ", error);
      result(error, null);
    } else {
      result(null, res);
    }
  });
};

Adminuser.getUserByUsername = function (admin_email, result) {
  connection.query(
    "SELECT * FROM admin_user WHERE admin_email = ?",
    admin_email,
    (error, res) => {
      if (error) {
        console.log("Error in retrieving user: ", error);
        result(error, null);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Adminuser.comparePasswords = function (password, hash, result) {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) {
      throw err;
    }

    result(null, isMatch);
  });
};

Adminuser.updateAdminuser = async function (adminuserId, updatedData) {
  try {
    const fieldsToUpdate = {};
    if (updatedData.user_name) fieldsToUpdate.user_name = updatedData.user_name;
    if (updatedData.admin_email) fieldsToUpdate.admin_email = updatedData.admin_email;
    if (updatedData.password) fieldsToUpdate.password = updatedData.password;
    if (updatedData.category) fieldsToUpdate.category = updatedData.category;

    const setClause = Object.keys(fieldsToUpdate)
      .map(field => `${field} = ?`)
      .join(", ");
    
    const values = Object.values(fieldsToUpdate);
    values.push(adminuserId);

    await new Promise((resolve, reject) => {
      connection.query(
        `UPDATE admin_user SET ${setClause} WHERE adminuser_id = ?`,
        values,
        (error, res) => {
          if (error) {
            console.error("Error in updating user: ", error);
            reject(error);
          } else {
            console.log("User updated successfully");
            resolve(res);
          }
        }
      );
    });
    return Promise.resolve("User updated successfully");
  } catch (err) {
    console.error("Error in updating user: ", err);
    return Promise.reject(err);
  }
};

Adminuser.deleteAdminuserById = function (AdminuserId, result) {
  connection.query(
    "DELETE FROM admin_user WHERE adminuser_id  = ?",
    [AdminuserId],
    (error, res) => {
      if (error) {
        console.log("Error in deleting Adminuser: ", error);
        result(error, null);
      } else {
        console.log("Adminuser deleted successfully");
        result(null, res);
      }
    }
  );
};

module.exports = Adminuser;
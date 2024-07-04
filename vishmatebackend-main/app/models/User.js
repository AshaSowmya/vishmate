const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
const config = require("../../config/config");
const connection = mysql.createConnection(config.database);

const User = function (user) {
  this.name = user.name;
  this.mobile = user.mobile;
  this.email = user.email;
  this.password = user.password;
  this.privacy_status = user.privacy_status;
  this.select_plan = user.select_plan;
  this.plan_price = user.plan_price;
  this.subscription_id = user.subscription_id;
  this.userstatus = user.userstatus;
};

User.createUser = function (newUser, result) {
  if (!newUser.password) {
    return result(new Error("Password is required"), null);
  }
  bcryptjs.hash(newUser.password, 10, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      return result(err, null);
    }
    newUser.password = hash;
    Object.keys(newUser).forEach((key) => {
      if (newUser[key] === "") {
        newUser[key] = "none";
      }
    });
    connection.query("INSERT INTO userlogin SET ?", newUser, (error, res) => {
      if (error) {
        console.log("Error in creating user:", error);
        return result(error, null);
      } else {
        console.log("User created successfully");
        return result(null, res.insertId);
      }
    });
  });
};

User.getAllUsers = function (result) {
  connection.query("SELECT * FROM userlogin", (error, res) => {
    if (error) {
      console.log("Error in retrieving all users: ", error);
      result(error, null);
    } else {
      result(null, res);
    }
  });
};


User.getUserByUsername = function (email, result) {
  connection.query(
    "SELECT * FROM userlogin WHERE email = ?",
    email,
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

User.getUserById = function (UserId, result) {
  connection.query(
    "SELECT * FROM userlogin WHERE customer_id = ?",
    UserId,
    (error, rows) => {
      if (error) {
        console.log("Error in retrieving User Id: ", error);
        result(error, null);
      } else {
        result(null, rows); // Return all rows matching the room_type
      }
    }
  );
};

User.comparePasswords = function (password, hash, result) {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) {
      throw err;
    }

    result(null, isMatch);
  });
};

User.updatePassword = async function (userId, newPassword) {
  if (!newPassword) {
    return Promise.reject({ message: "New password is required" });
  }
  try {
    const hash = await bcryptjs.hash(newPassword, 10);
    await new Promise((resolve, reject) => {
      connection.query(
        "UPDATE userlogin SET password = ? WHERE customer_id = ?",
        [hash, userId],
        (error, res) => {
          if (error) {
            console.error("Error in updating password: ", error);
            reject(error);
          } else {
            console.log("Password updated successfully");
            resolve("Password updated successfully"); // Resolve with success message
          }
        }
      );
    });
    return Promise.resolve("Password updated successfully");
  } catch (err) {
    console.error("Error in hashing password: ", err);
    return Promise.reject(err);
  }
};




module.exports = User;

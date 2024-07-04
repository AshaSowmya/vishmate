const mysql = require("mysql");
const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const Language = function (language) {
    this.language_image = language.language_image;
    this.language_name = language.language_name;
    this.status = language.status
};

Language.createLanguage = function (newLanguage, result) {
  Object.keys(newLanguage).forEach((key) => {
    if (newLanguage[key] === "") {
      newLanguage[key] = "none";
    }
  });
  connection.query(
    "INSERT INTO language SET ?",
    newLanguage,
    (error, res) => {
      if (error) {
        console.log("Error in creating language", error);
        result(error, null);
      } else {
        console.log("language created successfully");
        result(null, res.insertId);
      }
    }
  );
};

Language.getAllLanguage = function (callback) {
  connection.query("SELECT * FROM language", (error, rows) => {
    if (error) {
      console.log("Error in retrieving language: ", error);
      return callback(error, null);
    }
    callback(null, rows);
  });
};


Language.updateLanguageById = function (languageId, updatedLanguage, result) {
  const fields = Object.keys(updatedLanguage).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updatedLanguage);
  values.push(languageId);
  const query = `UPDATE language SET ${fields} WHERE language_id  = ?`;
  connection.query(query, values, (error, res) => {
    if (error) {
      console.log("Error in updating language: ", error);
      result(error, null);
    } else {
      console.log("language updated successfully");
      result(null, res);
    }
  });
};

Language.deleteLanguageById = function (languageId, result) {
    connection.query(
      "DELETE FROM language WHERE language_id   = ?",
      [languageId],
      (error, res) => {
        if (error) {
          console.log("Error in deleting language ", error);
          result(error, null);
        } else {
          console.log("language deleted successfully");
          result(null, res);
        }
      }
    );
  };
  
module.exports = Language;
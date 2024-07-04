const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const Marketplace = function (marketplace) {
    this.service_name = marketplace.service_name;
    this.price_amount = marketplace.price_amount;
    this.selected_image = marketplace.selected_image;
    this.about = marketplace.about;
    this.tools_used = marketplace.tools_used;
    this.status = marketplace.status;
};


Marketplace.createMarketplace = function (newMarketplace, result) {
    Object.keys(newMarketplace).forEach((key) => {
        if (newMarketplace[key] === "") {
          newMarketplace[key] = "none";
        }
      });   
    connection.query('INSERT INTO market_place SET ?', newMarketplace, (error, res) => {
        if (error) {
            console.log('Error in creating signupdata: ', error);
            result(error, null);
        } else {
            console.log('signupdata created successfully');
            result(null, res.insertId);
        }
    });

};

Marketplace.getAllMarketplace = function (callback) {
    connection.query('SELECT * FROM market_place', (error, rows) => {
        if (error) {
            console.log('Error in retrieving marketplace: ', error);
            return callback(error, null);
        }
        callback(null, rows);
    });
};


Marketplace.updateMarketplaceById = function (marketplaceId, updatedMarketplace, result) {
    const fields = Object.keys(updatedMarketplace).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updatedMarketplace);
    values.push(marketplaceId);
    const query = `UPDATE market_place SET ${fields} WHERE marketplace_id  = ?`;
    connection.query(query, values, (error, res) => {
      if (error) {
        console.log("Error in updating marketplace: ", error);
        result(error, null);
      } else {
        console.log("marketplace updated successfully");
        result(null, res);
      }
    });
  };


Marketplace.deleteMarketplaceById = function (MarketplaceId, result) {
    connection.query(
        "DELETE FROM market_place WHERE marketplace_id  = ?",
        [MarketplaceId],
        (error, res) => {
            if (error) {
                console.log("Error in deleting marketplace: ", error);
                result(error, null);
            } else {
                console.log("marketplace deleted successfully");
                result(null, res);
            }
        }
    );
};

module.exports = Marketplace;
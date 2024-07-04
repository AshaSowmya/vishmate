const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const News = function (news) {
    this.news_image = news.news_image;
    this.heading = news.heading;
    this.tagline = news.tagline;
    this.status = news.status;
};


News.createNews = function (newNews, result) {
    Object.keys(newNews).forEach((key) => {
        if (newNews[key] === "") {
          newNews[key] = "none";
        }
      });
    connection.query('INSERT INTO news SET ?', newNews, (error, res) => {
        if (error) {
            console.log('Error in creating news: ', error);
            result(error, null);
        } else {
            console.log('news created successfully');
            result(null, res.insertId);
        }
    });

};

News.getAllNews = function (callback) {
    connection.query('SELECT * FROM news', (error, rows) => {
        if (error) {
            console.log('Error in retrieving news: ', error);
            return callback(error, null);
        }
        callback(null, rows);
    });
};


News.updateNewsById = function (newsId, updatedNews, result) {
    const fields = Object.keys(updatedNews).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updatedNews);
    values.push(newsId);
    const query = `UPDATE news SET ${fields} WHERE news_id  = ?`;
    connection.query(query, values, (error, res) => {
      if (error) {
        console.log("Error in updating news: ", error);
        result(error, null);
      } else {
        console.log("news updated successfully");
        result(null, res);
      }
    });
  };


News.deleteNewsById = function (NewsId, result) {
    connection.query(
        "DELETE FROM news WHERE news_id  = ?",
        [NewsId],
        (error, res) => {
            if (error) {
                console.log("Error in deleting news: ", error);
                result(error, null);
            } else {
                console.log("news deleted successfully");
                result(null, res);
            }
        }
    );
};

module.exports = News;
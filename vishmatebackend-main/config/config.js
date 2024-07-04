require('dotenv').config();

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

module.exports = {
  jwtSecret: jwtSecret,
  jwtRefreshSecret: jwtRefreshSecret,
  database: {
    host: host,
    user: user,
    password: password,
    database: database
  }
};
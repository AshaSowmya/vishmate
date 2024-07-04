const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../../config/config");

// Define the unlock time (in milliseconds)
const unlockTime = 60000; // 60 seconds

// Define a dictionary to store login attempts
const loginAttempts = {};

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Check if the user has exceeded login attempts
  if (loginAttempts[email] >= 3) {
    // Check if the user is locked
    if (loginAttempts[`${email}_locked`] && loginAttempts[`${email}_locked`] > Date.now() - unlockTime) {
      // User is locked, return an error
      return res.status(429).json({ message: `Please wait for ${unlockTime / 1000} seconds` });
    }
    // User is not locked, lock the user
    loginAttempts[`${email}_locked`] = Date.now();
    return res.status(429).json({ message: `Please wait for ${unlockTime / 1000} seconds` });
  }

  User.getUserByUsername(email, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Failed to retrieve user" });
    }

    if (!user) {
      // Increase login attempts count
      loginAttempts[email] = (loginAttempts[email] || 0) + 1;
      return res.status(401).json({ message: "Invalid email " });
    }

    User.comparePasswords(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "Failed to compare passwords" });
      }

      if (user && !isMatch) {
        // Increase login attempts count
        loginAttempts[email] = (loginAttempts[email] || 0) + 1;
        return res.status(401).json({ message: "email matched but password wrong" });
      }

      // Reset login attempts and lock for the specified unlock time on unsuccessful login
      loginAttempts[email] = 0;
      loginAttempts[`${email}_locked`] = Date.now();

      const jwtSecret = config.jwtSecret; // Ensure 'config' references your configuration correctly
      const jwtRefreshSecret = config.jwtRefreshSecret;
      // Use these secrets in your token signing logic
      const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '15m' });
      const refreshToken = jwt.sign({ email: user.email }, jwtRefreshSecret, { expiresIn: '2h' });

      // Return tokens in the response
      res.status(200).json({ token, refreshToken, Name: user.name, User_status: user.userstatus, Email: user.email, Customer_id: user.customer_id });
    });
  });
};

exports.validate = (req, res) => {
  const email = req.body.email;
  User.getUserByUsername(email, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Failed to retrieve user" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }
    res.status(200).json({ email: user.email, message: "User Found" });
  })
}

exports.refreshToken = (req, res) => {
  const refreshTokenPayload = req.refreshTokenPayload;

  // Generate a new access token
  const token = jwt.sign({ email: refreshTokenPayload.email }, config.jwtSecret, {
    expiresIn: '1h',
  });

  // Return the new access token in the response
  res.status(200).json({ token });
};

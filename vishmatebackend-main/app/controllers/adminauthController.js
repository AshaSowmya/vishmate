const jwt = require("jsonwebtoken");
const Adminuser = require("../models/Adminuser");
const config = require("../../config/config");

// Define the unlock time (in milliseconds)
const unlockTime = 60000; // 60 seconds

// Define a dictionary to store login attempts
const loginAttempts = {};

exports.adminlogin = (req, res) => {
  const admin_email = req.body.admin_email;
  const password = req.body.password;

  // Check if the user has exceeded login attempts
  if (loginAttempts[admin_email] >= 3) {
    // Check if the user is locked
    if (loginAttempts[`${admin_email}_locked`] && loginAttempts[`${admin_email}_locked`] > Date.now() - unlockTime) {
      // User is locked, return an error
      return res.status(429).json({ message: `Please wait for ${unlockTime / 1000} seconds` });
    }
    // User is not locked, lock the user
    loginAttempts[`${admin_email}_locked`] = Date.now();
    return res.status(429).json({ message: `Please wait for ${unlockTime / 1000} seconds` });
  }

  Adminuser.getUserByUsername(admin_email, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Failed to retrieve user" });
    }

    if (!user) {
      // Increase login attempts count
      loginAttempts[admin_email] = (loginAttempts[admin_email] || 0) + 1;
      return res.status(401).json({ message: "Invalid admin email " });
    }

    Adminuser.comparePasswords(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "Failed to compare passwords" });
      }

      if (user && !isMatch) {
        // Increase login attempts count
        loginAttempts[admin_email] = (loginAttempts[admin_email] || 0) + 1;
        return res.status(401).json({ message: "admin_email matched but password wrong" });
      }

      // Reset login attempts and lock for the specified unlock time on unsuccessful login
      loginAttempts[admin_email] = 0;
      loginAttempts[`${admin_email}_locked`] = Date.now();

      const jwtSecret = config.jwtSecret; // Ensure 'config' references your configuration correctly
      const jwtRefreshSecret = config.jwtRefreshSecret;
      // Use these secrets in your token signing logic
      const token = jwt.sign({ admin_email: user.admin_email }, jwtSecret, { expiresIn: '15m' });
      const refreshToken = jwt.sign({ admin_email: user.admin_email }, jwtRefreshSecret, { expiresIn: '2h' });

      // Return tokens in the response
      res.status(200).json({ token, refreshToken, Name: user.user_name, User_category: user.category, admin_email: user.admin_email });
    });
  });
};

exports.adminvalidate = (req, res) => {
  const admin_email = req.body.admin_email;
  User.getUserByUsername(admin_email, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Failed to retrieve user" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid admin_email" });
    }
    res.status(200).json({ admin_email: user.admin_email, message: "User Found" });
  })
}

exports.refreshToken = (req, res) => {
  const refreshTokenPayload = req.refreshTokenPayload;

  // Generate a new access token
  const token = jwt.sign({ admin_email: refreshTokenPayload.admin_email }, config.jwtSecret, {
    expiresIn: '1h',
  });

  // Return the new access token in the response
  res.status(200).json({ token });
};

const jwt = require('jsonwebtoken');
const config = require('../config/config');

function verifyRefreshToken(req, res, next) {
  const refreshToken = req.body.refreshToken || req.headers['x-refresh-token'];

  if (!refreshToken) {
    return res.status(403).json({ message: 'No refresh token provided' });
  }

  jwt.verify(refreshToken, config.jwtRefreshSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate refresh token' });
    }

    req.refreshTokenPayload = decoded;
    next();
  });
}

module.exports = verifyRefreshToken;

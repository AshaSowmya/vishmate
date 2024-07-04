const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

function verifyToken1(req, res, next) {
    const token = req.headers['authorization'];

    if (!token || token !== `Bearer ${SECRET_KEY}`) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    next();
}

module.exports = verifyToken1;

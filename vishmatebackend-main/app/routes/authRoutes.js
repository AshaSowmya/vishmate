const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminauthController =require('../controllers/adminauthController');
const authMiddleware = require('../../middleware/authMiddleware');
const adminauthMiddleware =require('../../middleware/adminauthMiddleware');
const refreshMiddleware = require('../../middleware/refreshTokenMiddleware');

// Public route
router.post('/login', authController.login);
router.post('/validate', authController.validate);

//Admin Routes
router.post('/adminlogin',adminauthController.adminlogin);
router.get('/adminvalidate',adminauthController.adminvalidate);
router.get('/adminprotected',adminauthMiddleware,(req,res)=>{
  res.status(200).json({message:'Your admin accessed is protected'});
});

// Protected route
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'You accessed protected route' });
});
router.post('/refresh-token', refreshMiddleware, authController.refreshToken);

module.exports = router;
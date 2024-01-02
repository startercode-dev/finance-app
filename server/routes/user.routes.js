const express = require('express');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

const router = express.Router();

// router.get('/getall', userController.getAllUser);
router.use(authController.protect);
router.get('/info', userController.getMe);
router.patch('/update-me', userController.updateMe);
router.patch('/update-my-password', authController.updateMyPassword);

module.exports = router;

const express = require('express');
const authController = require('../controllers/auth.controller');
const accountController = require('../controllers/account.controller');

const router = express.Router();

// router.get('/getall', accountController.getAllUser);
router.use(authController.protect);
router.get('/user', accountController.getMe);
router.patch('/update-me', accountController.updateMe);
router.patch('/update-my-password', accountController.updateMyPassword);

module.exports = router;

const express = require('express');
const authController = require('../controllers/auth.controller');
const accountController = require('../controllers/account.controller');

const router = express.Router();

router.use(authController.protect);
router.get('/get', accountController.getAll);

module.exports = router;

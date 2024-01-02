const express = require('express');
const authController = require('../controllers/auth.controller');
const itemController = require('../controllers/item.controller');

const router = express.Router();

router.use(authController.protect);
router.get('/get', itemController.getAll);

module.exports = router;

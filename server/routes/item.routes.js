const express = require('express');
const itemController = require('../controllers/item.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.use(authController.protect);
router.post('/create_link_token', itemController.getLinkToken);
router.post('/get_access_token', itemController.getAccessToken);

module.exports = router;

const express = require('express');
const plaidController = require('../controllers/plaid.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.use(authController.protect);
router.post('/item/create_link_token', plaidController.getLinkToken);
router.post('/item/get_access_token', plaidController.getAccessToken);

router.get('/accounts/get', plaidController.getAccounts);
router.get('/transactions/get', plaidController.getTransactions);

module.exports = router;

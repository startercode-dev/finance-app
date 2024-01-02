const express = require('express');
const authController = require('../controllers/auth.controller');
const transactionController = require('../controllers/transaction.controller');

const router = express.Router();

router.use(authController.protect);
router.get('/get', transactionController.fetchTransactions);
router.patch('/:id', transactionController.updateTransaction);
router.get('/fetchDashboard', transactionController.fetchDashboard);

module.exports = router;

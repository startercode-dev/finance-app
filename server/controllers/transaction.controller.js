const Transaction = require('../models/transaction.model');
const catchAsync = require('../utils/catch-async');

exports.getAll = catchAsync(async (req, res, next) => {
    const transactions = await Transaction.find({ user: req.user._id });

    res.status(200).json({
        status: 'success',
        results: transactions.length,
        transactions,
    });
});

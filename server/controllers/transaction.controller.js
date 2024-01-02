const Transaction = require('../models/transaction.model');
const catchAsync = require('../utils/catch-async');

exports.getAll = catchAsync(async (req, res, next) => {
    const transactions = await Transaction.find({
        user: req.user._id,
    });

    res.status(200).json({
        status: 'success',
        results: transactions.length,
        transactions,
    });
});

exports.updateTransaction = catchAsync(async (req, res, next) => {
    const transaction = await Transaction.findOneAndUpdate(
        { transactionId: req.params.id },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        status: 'success',
        message: 'updated',
    });
});

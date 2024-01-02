const Account = require('../models/account.model');
const catchAsync = require('../utils/catch-async');

exports.getAll = catchAsync(async (req, res, next) => {
    const accounts = await Account.find({
        user: req.user._id,
    });

    res.status(200).json({
        status: 'success',
        results: accounts.length,
        accounts,
    });
});

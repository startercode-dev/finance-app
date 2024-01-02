const Item = require('../models/item.model');
const catchAsync = require('../utils/catch-async');

exports.getAll = catchAsync(async (req, res, next) => {
    const items = await Item.find({
        user: req.user._id,
    });

    res.status(200).json({
        status: 'success',
        results: items.length,
        items,
    });
});

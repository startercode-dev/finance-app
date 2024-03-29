const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');
const User = require('../models/user.model');

// HELPER FUNCTIONS
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.getAllUser = catchAsync(async (req, res, next) => {
    const data = await User.find();

    res.status(200).json({
        status: 'success',
        results: data.length,
        data,
    });
});

exports.getMe = catchAsync(async (req, res, next) => {
    const data = await User.findById(req.user.id);

    res.status(200).json({
        status: 'success',
        data,
    });
});

exports.updateMe = catchAsync(async (req, res, next) => {
    // create error for password change
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'not for password updates, use /updateMyPassword',
                400,
            ),
        );
    }

    // filter unwanted fields
    const filteredBody = filterObj(req.body, 'name', 'email');

    // update user
    const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: 'success',
        data: {
            user: updateUser,
        },
    });
});

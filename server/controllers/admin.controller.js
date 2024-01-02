const User = require('../models/user.model');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

// ADMIN
// exports.getAllUser = catchAsync(async (req, res, next) => {
//     const data = await User.find();

//     res.status(200).json({
//         status: 'success',
//         results: data.length,
//         data,
//     });
// });

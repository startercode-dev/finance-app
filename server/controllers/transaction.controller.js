const Transaction = require('../models/transaction.model');
const Account = require('../models/account.model');
const catchAsync = require('../utils/catch-async');
const { getMonthlySpending } = require('../utils/helpers');
const AppError = require('../utils/app-error');

exports.fetchTransactions = catchAsync(async (req, res, next) => {
    // Adding user to the query & exclude certain fields
    const queryObj = { user: req.user._id, ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Modified query string for MongoDB
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Transaction.find(JSON.parse(queryStr)).sort({ date: -1 });

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        // default query
        query = query.sort('-date');
    }

    // Fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
    } else {
        // default limiting
        query = query.select('-__v');
    }

    // Pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 25;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
        const total = await Transaction.countDocuments();
        if (skip >= total) {
            return next(new AppError('no more transactions', 404));
        }
    }

    // Exec the query
    const transactions = await query;
    const totalTransactions = await Transaction.countDocuments();
    const currentPage = page;
    const currentLimit = limit;

    res.status(200).json({
        status: 'success',
        results: transactions.length,
        totalTransactions,
        transactions,
        currentPage,
        currentLimit,
    });
});

exports.fetchDashboard = catchAsync(async (req, res, next) => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    // Date 1 month ago
    const date1m = new Date(new Date().setDate(today.getDate() - 31))
        .toISOString()
        .split('T')[0];

    // Last month date, with accurate year
    const prevMonthDate = new Date(today.setMonth(month - 1));

    // Adjust the month number to fit yyyy-mm format
    const currMonth = `0${month + 1}`.slice(-2);
    const prevMonth = `0${prevMonthDate.getMonth() + 1}`.slice(-2);

    // All fetch promises
    //- Fetch Current Spending
    const currMonthDataPromise = getMonthlySpending(
        req.user._id,
        year,
        currMonth,
    );
    const prevMonthDataPromise = getMonthlySpending(
        req.user._id,
        prevMonthDate.getFullYear(),
        prevMonth,
    );

    //- Fetch Card Balances
    const accountsPromise = Account.find({
        user: req.user._id,
    });

    //- Fetch 1 month ago transactions
    const transactions1mPromise = Transaction.find({
        user: req.user._id,
        date: { $gte: `${date1m}` },
    }).sort({ date: -1 });

    //- Fetch Top Categories
    const topCategoriesPromise = Transaction.aggregate([
        {
            $match: {
                date: {
                    $gte: `${year}-${currMonth}-01`,
                    $lte: `${year}-${currMonth}-31`,
                },
                user: req.user._id,
            },
        },
        {
            $group: {
                _id: '$activeCategory',
                total: { $sum: '$amount' },
                count: { $sum: 1 },
                iconUrl: { $first: '$plaidCategoryIconUrl' },
            },
        },
        {
            $sort: { total: -1 },
        },
    ]);

    // Parallel fetch all data from database
    const [
        accounts,
        currMonthData,
        prevMonthData,
        transactions1m,
        topCategories,
    ] = await Promise.all([
        accountsPromise,
        currMonthDataPromise,
        prevMonthDataPromise,
        transactions1mPromise,
        topCategoriesPromise,
    ]);

    // Check if there's transaction data
    const currMonthSpending =
        currMonthData.length > 0 ? currMonthData[0].sumSpending : '';
    const prevMonthSpending =
        prevMonthData.length > 0 ? prevMonthData[0].sumSpending : '';
    const percentChange = +(
        ((currMonthSpending - prevMonthSpending) / prevMonthSpending) *
        100
    ).toFixed(2);

    // Return Data
    res.status(200).json({
        status: 'success',
        currMonthSpending,
        percentChange,
        topCategories,
        transactions1m,
        accounts,
    });
});

exports.updateTransaction = catchAsync(async (req, res, next) => {
    await Transaction.findOneAndUpdate(
        { transactionId: req.params.id },
        req.body,
        {
            new: true,
            runValidators: true,
        },
    );

    res.status(200).json({
        status: 'success',
        message: 'updated',
    });
});

const mongoose = require('mongoose');
const Account = require('./account.model');

const transactionSchema = new mongoose.Schema(
    {
        date: {
            type: String,
            trim: true,
        },

        authorizedDate: {
            type: String,
            trim: true,
        },

        merchantName: {
            type: String,
            trim: true,
        },

        transactionName: {
            type: String,
            trim: true,
        },

        amount: {
            type: Number,
            trim: true,
        },

        activeCategory: {
            type: String,
            trim: true,
        },

        category: {
            type: [String],
            trim: true,
        },

        personalCategory: {
            type: {},
            trim: true,
        },

        transactionId: {
            type: String,
            trim: true,
        },

        pending: {
            type: Boolean,
            trim: true,
        },

        account: {
            type: mongoose.Schema.ObjectId,
            ref: 'Account',
            required: [true, 'must belong to a users account'],
        },

        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'must belong to a user'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

transactionSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'account',
        model: Account,
        select: 'accountOfficialName',
    });

    next();
});

const Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction;

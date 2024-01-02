const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        accountId: {
            type: String,
            trim: true,
        },

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

        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'must belong to a user'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction;

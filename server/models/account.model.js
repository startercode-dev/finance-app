const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
    {
        accountId: {
            type: String,
            trim: true,
        },

        accountName: {
            type: String,
            trim: true,
        },

        accountOfficialName: {
            type: String,
            trim: true,
        },

        availableBalance: {
            type: Number,
            trim: true,
        },

        currentBalance: {
            type: Number,
            trim: true,
        },

        subtype: {
            type: String,
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

const Account = mongoose.model('accounts', accountSchema);

module.exports = Account;

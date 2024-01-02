const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        itemId: {
            type: String,
            trim: true,
        },

        accessToken: {
            type: String,
            trim: true,
        },

        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'must belong to a user'],
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Item = mongoose.model('items', itemSchema);

module.exports = Item;

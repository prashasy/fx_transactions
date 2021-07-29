const mongoose = require('mongoose');

//Schema
const transactionsSchema = new mongoose.Schema(
    {
        transactionId: { type: String, unique: true, required: [true, 'Required field'] },
        clientName: { type: String, required: true },
        position: { type: String, enum: ['BUY', 'SELL'], required: [true, 'Required field'] },
        currency: String,
        rateHQ: String,
        rateSpread: String,
        amount: Number,
        branchId: String,
        status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'] }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    }
);

//Model
const transactionsModel = mongoose.model('transactions', transactionsSchema);

module.exports = transactionsModel;
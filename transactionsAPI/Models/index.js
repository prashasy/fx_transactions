const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/fxTransactions', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB connection successful!'));


const transactionsModel = require('./transactions');

module.exports = { 'transactionsModel': transactionsModel }
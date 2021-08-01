const { generateTransactionId, buildTransactionData, validateOrder } = require('../Utilities/helpers');

const Models = require('../Models/index');

exports.submitTransaction = async (req, res, next) => {
    try {
        const transaction = await buildTransactionData(req.body)
        const isValid = await validateOrder(transaction);
        if (!isValid)
            throw new Error('Invalid data')
        await Models.transactionsModel.create(transaction);
        res.send("Transaction Created");
    }
    catch (err) {
        next({
            'status': 'Error in creating transaction',
            'status code': 400,
            'error': err
        });
    }
}

exports.updateTransaction = async (req, res, next) => {
    try {
        let transaction = await Models.transactionsModel.find({ transactionId: req.body.transactionId });
        if (transaction.length == 0) {
            next({ 'status': 'Error', 'status_code': 400, 'message': "Transaction does not exist" })
            return;
        }
        await Models.transactionsModel.updateOne({ transactionId: req.body.transactionId }, { ...transaction, status: req.body.status })
        res.status(200).send(true);
    }
    catch (err) {
        next({
            'status': 'Error in updating transaction',
            'status code': 400,
            'message': err.message
        });
    }
}

exports.getRates = async (req, res, next) => {
    try {
        let rates = await Models.ratesModel.find({});
        res.status(200).send(rates);
    }
    catch (err) {
        next({
            'status': 'Error in getting rates',
            'status code': 400,
            'message': err.message
        });
    }
}

exports.getBranches = async (req, res, next) => {
    try {
        let branches = await Models.branchesModel.find({});
        res.status(200).send(branches);
    }
    catch (err) {
        next({
            'status': 'Error in getting branches',
            'status code': 400,
            'message': err.message
        });
    }
}
const calculateResult = (transactions) => {
    let amountHQSum = 0, amountSpreadSum = 0;
    let currencyWiseSummary = {};
    transactions.forEach((data) => {
        if (data.status !== 'APPROVED')
            return;
        if (!currencyWiseSummary[data.currency]) {
            currencyWiseSummary[data.currency] = { quantity: 0, amountHQSum: 0, amountSpreadSum: 0, profit: 0, totalTransactions: 0 };
        }
        currencyWiseSummary[data.currency]['quantity'] += data.quantity;
        currencyWiseSummary[data.currency]['amountHQSum'] += data.amountHQ;
        currencyWiseSummary[data.currency]['amountSpreadSum'] += data.amountSpread;
        currencyWiseSummary[data.currency]['totalTransactions'] += 1;
        amountHQSum += data.amountHQ;
        amountSpreadSum += data.amountSpread;
    });
    for (var key of Object.keys(currencyWiseSummary)) {
        let obj = currencyWiseSummary[key];
        currencyWiseSummary[key]['profit'] = obj.amountSpreadSum - obj.amountHQSum;
    }
    return { currencyWiseSummary, amountHQSum, amountSpreadSum, profit: (amountSpreadSum - amountHQSum), totalTransactions: transactions.length }
}

exports.getSummaryByBranch = async (req, res, next) => {
    try {
        let bid = (req.params.branch).toUpperCase()
        let transactions = await Models.transactionsModel.find({ branchId: bid });
        let summary = calculateResult(transactions);
        res.status(200).send(summary);
    }
    catch (err) {
        next({
            'status': 'Error in getting branches',
            'status code': 400,
            'message': err.message
        });
    }
}

exports.getTransactionsByBranch = async (req, res, next) => {
    try {
        let bid = (req.params.branch).toUpperCase()
        let transactions = await Models.transactionsModel.find({ branchId: bid });
        res.status(200).send(transactions);
    }
    catch (err) {
        next({
            'status': 'Error in getting transactions',
            'status code': 400,
            'message': err.message
        });
    }
}
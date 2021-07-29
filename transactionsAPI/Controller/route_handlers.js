const { generateTransactionId } = require('../Utilities/helpers');

const Models = require('../Models/index');

exports.submitTransaction = async (req, res, next) => {
    try {
        const id = await generateTransactionId();
        // const user = { 'UserId': "1234", 'Name': 'Prashasy Ashok', 'DateOfBirth': new Date(1997, 09, 29) }
        //clientName,currency,position,branchName,amount
        console.log(req.body);
        const transaction = { ...req.body, transactionId: id, status: 'PENDING' }
        await Models.transactionsModel.create(transaction);
        res.send("Transaction Created");
    }
    catch (err) {
        console.log("Error in creating transaction", err);
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
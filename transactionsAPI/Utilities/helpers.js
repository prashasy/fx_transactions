const Models = require('../Models/index');

exports.generateTransactionId = async () => {
    let transactions = await Models.transactionsModel.find({}).sort({ transactionId: -1 });
    if (transactions.length == 0) {
        return "TID-0001"
    }
    const size = 4;
    id = transactions[0].transactionId;
    id = id.substring(4);
    id = parseInt(id) + 1;
    var s = id + "";
    while (s.length < size) s = "0" + s;    //appends leading zeroes
    id = "TID-" + s;
    return id;
}

const Models = require('../Models/index');

const generateTransactionId = async () => {
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

const getBranchNameById = async (branchId) => {
    let branches = await Models.branchesModel.findOne({ id: branchId.toUpperCase() });
    if (branches)
        return branches.name;
    return null;
}

const getRateByCurrency = async (currency) => {
    let { rate, spread } = await Models.ratesModel.findOne({ currency: currency });
    return { rate, spread };
}

const getRates = async (body) => {
    const { rate, spread } = await getRateByCurrency(body.currency);
    const rateSpread = rate + (rate * spread);
    const amountHQ = rate * body.quantity;
    const amountSpread = rateSpread * body.quantity;
    return { rateHQ: rate, rateSpread, amountSpread, amountHQ };
}
const buildTransactionData = async (body) => {
    const id = await generateTransactionId();
    const { rateHQ, rateSpread, amountSpread, amountHQ } = await getRates(body);
    console.log(rateHQ, rateSpread);
    return { ...body, transactionId: id, status: 'PENDING', rateHQ, rateSpread, amountSpread, amountHQ }
}

const validateOrder = async (transaction) => {
    //validate if branch exists
    //validate if balance is valid
    return true;
}

module.exports = {
    generateTransactionId,
    getBranchNameById,
    buildTransactionData,
    validateOrder
}
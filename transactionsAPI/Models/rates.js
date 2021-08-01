const mongoose = require('mongoose');
//Schema
const ratesSchema = new mongoose.Schema(
    {

        currency: {
            type: String
        },
        rate: {
            type: Number
        },
        spread: {
            type: Number
        }

    }
);

//Model
const ratesModel = mongoose.model('rates', ratesSchema);

module.exports = ratesModel;
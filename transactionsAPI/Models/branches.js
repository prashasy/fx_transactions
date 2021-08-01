const mongoose = require('mongoose');
//Schema
const branchesSchema = new mongoose.Schema(
    {
        id: {
            type: String
        },
        name: {
            type: String
        },
        address: {
            line1: {
                type: String
            },
            line2: {
                type: String
            },
            line3: {
                type: String
            },
            city: {
                type: String
            },
            zip: {
                type: Date
            },
            country: {
                type: String
            },
            tel: {
                type: String
            }
        }
    }
);

//Model
const branchesModel = mongoose.model('branches', branchesSchema);

module.exports = branchesModel;
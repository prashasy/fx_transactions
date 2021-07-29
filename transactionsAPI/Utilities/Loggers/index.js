const fs = require('fs');
const { promisify } = require('util');

const appendFile = promisify(fs.appendFile);



const { errorLogger } = require('./errorLogger')
const { requestLogger } = require('./requestLogger')

module.exports = {
    errorLogger,
    requestLogger
};
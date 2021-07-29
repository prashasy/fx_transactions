const fs = require('fs');
const { promisify } = require('util');

const appendFile = promisify(fs.appendFile);

exports.errorLogger = async (err, req, res, next) => {
    try {
        await appendFile('errorLog.log', err);
        res.status(400).json(err);
    }
    catch (err) { console.log(err); }
}

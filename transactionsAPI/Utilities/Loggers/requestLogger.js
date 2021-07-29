const fs = require('fs');
const { promisify } = require('util');

const appendFile = promisify(fs.appendFile);

exports.requestLogger = async (req, res, next) => {
    try { await appendFile('reqLog.log', `Request URL=> ${req.url} Request Method => ${req.method}`); next(); }
    catch (err) { console.log(err); next(err); }

}
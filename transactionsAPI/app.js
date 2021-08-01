const express = require('express');
const router = require('./Routes/router');
const app = express();
const logger = require('./Utilities/Loggers/')
const cors = require('cors');
// var corsOptions = {
//     origin: 'http://localhost:3000'
// }
app.use(cors());
const bodyParser = require('body-parser');

app.use(bodyParser.json());


app.use(logger.requestLogger);
app.use(router);

app.use(logger.errorLogger);
const server = app.listen(3001);

const express = require('express')

const router = express.Router();

const controller = require('../Controller/route_handlers')

router.get('/', controller.homePage);
// router.get('/name', controller.userPage);
router.post('/submit', controller.submitTransaction);
router.put('/update', controller.updateTransaction);
module.exports = router;
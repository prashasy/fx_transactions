const express = require('express')

const router = express.Router();

const controller = require('../Controller/route_handlers')

router.post('/submit', controller.submitTransaction);
router.put('/update', controller.updateTransaction);
router.get('/rates', controller.getRates);
router.get('/branches', controller.getBranches);
router.get('/admin/transactions/:branch', controller.getTransactionsByBranch)
router.get('/admin/:branch', controller.getSummaryByBranch)
module.exports = router;
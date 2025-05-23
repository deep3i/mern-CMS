const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware.js');
const { addCustomer, getCustomers, addComments } = require('../controllers/customerController.js');

router.post('/customers', auth, addCustomer);
router.get('/customers', auth, getCustomers);
router.post('/customers/comment', auth, addComments);

module.exports = router;

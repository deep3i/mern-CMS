const express = require('express');
const router = express.Router();
const customerRoute = require('./customerRoutes.js');
const authRoutes = require('./authRoutes.js');

router.use(customerRoute);
router.use(authRoutes);

module.exports = router;


const express = require('express');
const router = express.Router();
const { register, login, refresh, logout } = require('../controllers/authController.js');

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/refresh', refresh);
router.post('/auth/logout', logout);

module.exports = router;

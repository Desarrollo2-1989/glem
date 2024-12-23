const express = require('express');
const { login, refreshToken, logout } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);

module.exports = router;
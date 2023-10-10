const express = require('express');

const router = express.Router();

const AuthController = require('../controllers/auth.controller');

/* POST */

router.post('/login', AuthController.login);

router.post('/register', AuthController.register);

router.post('/logout', AuthController.logout);

router.post('/refresh', AuthController.refresh);

module.exports = router;

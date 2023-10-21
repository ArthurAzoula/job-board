const express = require('express');

const router = express.Router();

const AuthController = require('../controllers/auth.controller');

/* POST */

router.post('/login', AuthController.login);

router.post('/logout', AuthController.logout);

router.post('/refresh', AuthController.refresh);

/* GET */

router.get('/:type/:token', AuthController.getUserConnected);

module.exports = router;

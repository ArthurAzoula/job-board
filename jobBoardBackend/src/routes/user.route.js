const express = require('express');

const router = express.Router();

const UserController = require('../controllers/user.controller');

/* GET */

router.get('/', UserController.getAllUsers);

router.get('/:id', UserController.getUserById);

router.get('/me', UserController.getUserConnected);

/* POST */

router.post('/', UserController.createUser);

/* PUT */

router.put('/:id', UserController.updateUser);

/* DELETE */

router.delete('/:id', UserController.deleteUser);
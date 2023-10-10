const express = require('express');

const router = express.Router();

const peopleController = require('../controllers/people.controller');

/* GET */

router.get('/', peopleController.getAllUsers);

router.get('/:id', peopleController.getUserById);

router.get('/me', peopleController.getUserConnected);

/* PUT */

router.put('/:id', peopleController.updateUser);

/* DELETE */

router.delete('/:id', peopleController.deleteUser);

module.exports = router
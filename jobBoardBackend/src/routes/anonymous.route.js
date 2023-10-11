const express = require('express');

const router = express.Router();

const anonymousController = require('../controllers/anonymous.controller'); 

router.post('/', anonymousController.create);

router.get('/', anonymousController.findAll);

router.get('/:id', anonymousController.findOne);

router.put('/:id', anonymousController.update);

router.delete('/:id', anonymousController.remove);

module.exports = router;


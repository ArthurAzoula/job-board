const express = require('express');

const router = express.Router();

const anonymousController = require('../controllers/anonymous.controller'); 


/* GET anonymous listing. */

router.get('/', anonymousController.findAll);

// router.get('/:id', anonymousController.findOne); 

router.get('/email/:email', anonymousController.findAnonymousByEmail);

/* POST anonymous listing. */

router.post('/', anonymousController.create);

/* PUT anonymous listing. */

router.put('/:id', anonymousController.update);

/* DELETE anonymous listing. */

router.delete('/:id', anonymousController.remove);


module.exports = router;


const express = require('express');

const router = express.Router();

const CandidatureController = require('../controllers/aandidature.controller');

/* GET */

router.get('/', CandidatureController.getAllCandidatures);

router.get('/:id', CandidatureController.getCandidatureById);

/* POST */

router.post('/', CandidatureController.createCandidature);  

/* PUT */

router.put('/:id', CandidatureController.updateCandidature);

/* DELETE */

router.delete('/:id', CandidatureController.deleteCandidature);


module.exports = router;
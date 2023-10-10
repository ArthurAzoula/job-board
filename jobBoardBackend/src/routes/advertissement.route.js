const express = require('express');

const router = express.Router();

const AdvertissementController = require('../controllers/advertissement.controller');

/* GET */

router.get('/', AdvertissementController.getAllAdvertissements);

/* POST */

router.post('/', AdvertissementController.createAdvertissement);

/* PUT */

router.put('/:id', AdvertissementController.updateAdvertissement);

/* DELETE */

router.delete('/:id', AdvertissementController.deleteAdvertissement);


module.exports = router;
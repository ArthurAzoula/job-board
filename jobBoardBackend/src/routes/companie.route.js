const express = require('express');

const router = express.Router();

const CompanieController = require('../controllers/companie.controller');

/* GET */

router.get('/', CompanieController.getAllCompanies);

router.get('/:id', CompanieController.getCompanieById);

/* POST */

router.post('/', CompanieController.createCompanie);

/* PUT */

router.put('/:id', CompanieController.updateCompanie);

/* DELETE */

router.delete('/:id', CompanieController.deleteCompanie);


module.exports = router;
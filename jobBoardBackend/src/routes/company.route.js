const express = require('express');

const router = express.Router();

const CompanieController = require('../controllers/companie.controller');

/* GET */

router.get('/', CompanieController.getAllCompany);

router.get('/:id', CompanieController.getCompanyById);

/* POST */

router.post('/', CompanieController.createCompany);

/* PUT */

router.put('/:id', CompanieController.updateCompany);

/* DELETE */

router.delete('/:id', CompanieController.deleteCompany);


module.exports = router;
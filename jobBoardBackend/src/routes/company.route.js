const express = require('express');
const router = express.Router();
const CompanieController = require('../controllers/companie.controller');

/**
 * GET /company
 * Gets all companies.
 * @name GET /company
 * @function
 * @memberof module:routers/companyRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the companies.
 */
router.get('/', CompanieController.getAllCompany);

/**
 * GET /company/:id
 * Gets a company by ID.
 * @name GET /company/:id
 * @function
 * @memberof module:routers/companyRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the company.
 */
router.get('/:id', CompanieController.getCompanyById);

/**
 * POST /company
 * Creates a new company.
 * @name POST /company
 * @function
 * @memberof module:routers/companyRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the created company.
 */
router.post('/', CompanieController.createCompany);

/**
 * PUT /company/:id
 * Updates a company by ID.
 * @name PUT /company/:id
 * @function
 * @memberof module:routers/companyRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the updated company.
 */
router.put('/:id', CompanieController.updateCompany);

/**
 * DELETE /company/:id
 * Deletes a company by ID.
 * @name DELETE /company/:id
 * @function
 * @memberof module:routers/companyRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with a success message.
 */
router.delete('/:id', CompanieController.deleteCompany);

module.exports = router;
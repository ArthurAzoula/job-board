const express = require('express');
const router = express.Router();
const AdvertissementController = require('../controllers/advertissement.controller');

/**
 * GET /advertissements/filters
 * Gets the filters for Advertissements.
 * @name GET /advertissements/filters
 * @function
 * @memberof module:routers/advertissementRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the filters.
 */
router.get('/filters', AdvertissementController.getAdvertissementFilters);

/**
 * GET /advertissements/company/:companyId
 * Gets Advertissements by company ID.
 * @name GET /advertissements/company/:companyId
 * @function
 * @memberof module:routers/advertissementRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the Advertissements.
 */
router.get('/company/:companyId', AdvertissementController.getAdvertissementByCompany);

/**
 * GET /advertissements/:id
 * Gets an Advertissement by ID.
 * @name GET /advertissements/:id
 * @function
 * @memberof module:routers/advertissementRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the Advertissement.
 */
router.get('/:id', AdvertissementController.getAdvertissementById);

/**
 * GET /advertissements
 * Gets all Advertissements.
 * @name GET /advertissements
 * @function
 * @memberof module:routers/advertissementRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the Advertissements.
 */
router.get('/', AdvertissementController.getAllAdvertissements);

/**
 * POST /advertissements
 * Creates a new Advertissement.
 * @name POST /advertissements
 * @function
 * @memberof module:routers/advertissementRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the created Advertissement.
 */
router.post('/', AdvertissementController.createAdvertissement);

/**
 * PUT /advertissements/:id
 * Updates an Advertissement by ID.
 * @name PUT /advertissements/:id
 * @function
 * @memberof module:routers/advertissementRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the updated Advertissement.
 */
router.put('/:id', AdvertissementController.updateAdvertissement);

/**
 * DELETE /advertissements/:id
 * Deletes an Advertissement by ID.
 * @name DELETE /advertissements/:id
 * @function
 * @memberof module:routers/advertissementRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with a success message.
 */
router.delete('/:id', AdvertissementController.deleteAdvertissement);

module.exports = router;
const express = require('express');
const router = express.Router();
const anonymousController = require('../controllers/anonymous.controller');

/**
 * GET /anonymous
 * Gets all anonymous listings.
 * @name GET /anonymous
 * @function
 * @memberof module:routers/anonymousRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the anonymous listings.
 */
router.get('/', anonymousController.findAll);

/**
 * GET /anonymous/:id
 * Gets an anonymous listing by ID.
 * @name GET /anonymous/:id
 * @function
 * @memberof module:routers/anonymousRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the anonymous listing.
 */
router.get('/:id', anonymousController.findOne);

/**
 * GET /anonymous/email/:email
 * Gets an anonymous listing by email.
 * @name GET /anonymous/email/:email
 * @function
 * @memberof module:routers/anonymousRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the anonymous listing.
 */
router.get('/email/:email', anonymousController.findAnonymousByEmail);

/**
 * POST /anonymous
 * Creates a new anonymous listing.
 * @name POST /anonymous
 * @function
 * @memberof module:routers/anonymousRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the created anonymous listing.
 */
router.post('/', anonymousController.create);

/**
 * PUT /anonymous/:id
 * Updates an anonymous listing by ID.
 * @name PUT /anonymous/:id
 * @function
 * @memberof module:routers/anonymousRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the updated anonymous listing.
 */
router.put('/:id', anonymousController.update);

/**
 * DELETE /anonymous/:id
 * Deletes an anonymous listing by ID.
 * @name DELETE /anonymous/:id
 * @function
 * @memberof module:routers/anonymousRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with a success message.
 */
router.delete('/:id', anonymousController.remove);

module.exports = router;
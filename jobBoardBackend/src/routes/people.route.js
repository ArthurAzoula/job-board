const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/people.controller');

/**
 * GET /people
 * Gets all users.
 * @name GET /people
 * @function
 * @memberof module:routers/peopleRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the users.
 */
router.get('/', peopleController.getAllUsers);

/**
 * GET /people/:id
 * Gets a user by ID.
 * @name GET /people/:id
 * @function
 * @memberof module:routers/peopleRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the user.
 */
router.get('/:id', peopleController.getUserById);

/**
 * POST /people
 * Creates a new user.
 * @name POST /people
 * @function
 * @memberof module:routers/peopleRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the created user.
 */
router.post('/', peopleController.createUser);

/**
 * PUT /people/:id
 * Updates a user by ID.
 * @name PUT /people/:id
 * @function
 * @memberof module:routers/peopleRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the updated user.
 */
router.put('/:id', peopleController.updateUser);

/**
 * DELETE /people/:id
 * Deletes a user by ID.
 * @name DELETE /people/:id
 * @function
 * @memberof module:routers/peopleRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with a success message.
 */
router.delete('/:id', peopleController.deleteUser);

module.exports = router;
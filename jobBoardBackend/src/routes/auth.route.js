const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

/**
 * POST /auth/login
 * Logs in a user.
 * @name POST /auth/login
 * @function
 * @memberof module:routers/authRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the user's access and refresh tokens.
 */
router.post('/login', AuthController.login);

/**
 * POST /auth/logout
 * Logs out a user.
 * @name POST /auth/logout
 * @function
 * @memberof module:routers/authRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with a success message.
 */
router.post('/logout', AuthController.logout);

/**
 * POST /auth/refresh
 * Refreshes a user's access token.
 * @name POST /auth/refresh
 * @function
 * @memberof module:routers/authRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the user's new access token.
 */
router.post('/refresh', AuthController.refresh);

/**
 * GET /auth/:type/:token
 * Gets the user connected to a token.
 * @name GET /auth/:type/:token
 * @function
 * @memberof module:routers/authRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the connected user.
 */
router.get('/:type/:token', AuthController.getUserConnected);

module.exports = router;
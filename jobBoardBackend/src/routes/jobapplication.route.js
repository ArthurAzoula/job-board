const express = require('express');
const router = express.Router();
const jobapplication = require('../controllers/jobapplication.controller');

/**
 * GET /jobapplication
 * Gets all job applications.
 * @name GET /jobapplication
 * @function
 * @memberof module:routers/jobApplicationRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the job applications.
 */
router.get('/', jobapplication.getAllJobApplications);

/**
 * GET /jobapplication/:id
 * Gets a job application by ID.
 * @name GET /jobapplication/:id
 * @function
 * @memberof module:routers/jobApplicationRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the job application.
 */
router.get('/:id', jobapplication.getJobApplicationById);

/**
 * GET /jobapplication/advert/:advertId
 * Gets a user's job application from an advert.
 * @name GET /jobapplication/advert/:advertId
 * @function
 * @memberof module:routers/jobApplicationRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the user's job application.
 */
router.get('/advert/:advertId', jobapplication.getUserJobApplicationFromAnAdvert);

/**
 * GET /jobapplication/user/:userId
 * Gets all job applications by user ID.
 * @name GET /jobapplication/user/:userId
 * @function
 * @memberof module:routers/jobApplicationRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the job applications.
 */
router.get('/user/:userId', jobapplication.getJobApplicationsByUserId);

/**
 * POST /jobapplication
 * Creates a new job application.
 * @name POST /jobapplication
 * @function
 * @memberof module:routers/jobApplicationRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the created job application.
 */
router.post('/', jobapplication.createJobApplication);

/**
 * PUT /jobapplication/:id
 * Updates a job application by ID.
 * @name PUT /jobapplication/:id
 * @function
 * @memberof module:routers/jobApplicationRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the updated job application.
 */
router.put('/:id', jobapplication.updateJobApplication);

/**
 * DELETE /jobapplication/:id
 * Deletes a job application by ID.
 * @name DELETE /jobapplication/:id
 * @function
 * @memberof module:routers/jobApplicationRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with a success message.
 */
router.delete('/:id', jobapplication.deleteJobApplication);

module.exports = router;
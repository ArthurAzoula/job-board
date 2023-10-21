const express = require('express');
const router = express.Router();
const TablesController = require('../controllers/tables.controller');

/**
 * GET /tables
 * Gets all tables.
 * @name GET /tables
 * @function
 * @memberof module:routers/tablesRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the tables.
 */
router.get('/', TablesController.getTables);

/**
 * GET /tables/:tableName
 * Gets a record by table name.
 * @name GET /tables/:tableName
 * @function
 * @memberof module:routers/tablesRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the record.
 */
router.get('/:tableName', TablesController.getRecordByTableName);

/**
 * POST /tables/:tableName
 * Creates a new record.
 * @name POST /tables/:tableName
 * @function
 * @memberof module:routers/tablesRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the created record.
 */
router.post('/:tableName', TablesController.createRecord);

/**
 * PUT /tables/:tableName/:id
 * Updates a record by ID.
 * @name PUT /tables/:tableName/:id
 * @function
 * @memberof module:routers/tablesRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the updated record.
 */
router.put('/:tableName/:id', TablesController.updateRecord);

/**
 * DELETE /tables/:tableName/:id
 * Deletes a record by ID.
 * @name DELETE /tables/:tableName/:id
 * @function
 * @memberof module:routers/tablesRoute
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with a success message.
 */
router.delete('/:tableName/:id', TablesController.deleteRecord);

module.exports = router;
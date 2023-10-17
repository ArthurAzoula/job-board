const express = require('express');

const router = express.Router();

const TablesController = require('../controllers/tables.controller');

/* GET */

router.get('/', TablesController.getTables);

router.get('/:tableName', TablesController.getRecordByTableName);

/* POST */

router.post('/:tableName', TablesController.createRecord);

/* PUT */

router.put('/:tableName/:id', TablesController.updateRecord);

/* DELETE */

router.delete('/:tableName/:id', TablesController.deleteRecord);


module.exports = router;
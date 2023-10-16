const database = require('../models/index');

const getTables = async (req, res) => {
    try {
        // Get all tables from the database with sequelize
        const tables = await database.sequelize.query('SHOW TABLES', { type: database.sequelize.QueryTypes.SHOWTABLES });
        // Check if there is tables
        if (tables) {
            // Return the tables
            return res.status(200).json(tables);
        }
        // Return an error if there is no tables
        return res.status(404).send('Tables does not exists');

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }


};

const getRecordByTableName = async (req, res) => {
    try {
        // Get the table name from the request
        const tableName = req.params.tableName;
        // Get the record from the database with sequelize
        const record = await database.sequelize.query(`SELECT * FROM ${tableName}`, { type: database.sequelize.QueryTypes.SELECT });
        // Check if there is a record
        if (record) {
            // Return the record
            return res.status(200).json(record);
        }
        // Return an error if there is no record
        return res.status(404).send('Record does not exists');



    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateRecord = async (req, res) => {
    try {
        // Get the table name, record ID, and updated record data from the request
        const { tableName, id } = req.params;
        const updatedRecordData = req.body;
        // Update the record in the database with sequelize
        const [numRowsUpdated, [updatedRecord]] = await database[tableName].update(updatedRecordData, {
            where: { id },
            returning: true,
        });
        // Check if the record was updated
        if (numRowsUpdated === 0) {
            // Return an error if the record was not updated
            return res.status(404).send('Record not found');
        }
        // Return the updated record
        return res.status(200).json(updatedRecord);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const createRecord = async (req, res) => {
    try {
        // Get the table name and new record data from the request
        const { tableName } = req.params;
        const newRecordData = req.body;
        // Create the record in the database with sequelize
        const newRecord = await database[tableName].create(newRecordData);
        // Return the new record
        return res.status(201).json(newRecord);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteRecord = async (req, res) => {
    try {
        // Get the table name and record ID from the request
        const { tableName, id } = req.params;
        // Delete the record from the database with sequelize
        const numRowsDeleted = await database[tableName].destroy({ where: { id } });
        // Check if the record was deleted
        if (numRowsDeleted === 0) {
            // Return an error if the record was not deleted
            return res.status(404).send('Record not found');
        }
        // Return a success message
        return res.status(200).send('Record deleted successfully');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getTables,
    getRecordByTableName,
    updateRecord,
    deleteRecord,
    createRecord
}
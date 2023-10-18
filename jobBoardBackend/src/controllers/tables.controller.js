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

        let tableId = "";
        let table = "";

        switch (tableName.trim()) {
            case "people":
                tableId = "people_id";
                table = "people";
                break;
            case "companies":
                tableId = "company_id";
                table = "company";
                break;
            case "advertissements":
                tableId = "advertissement_id";
                table = "advertissement";
                break;
            case "jobapplications":
                tableId = "jobapplication_id";
                table = "jobapplication";
                break;
            case "anonymous":
                tableId = "anonymous_id";
                table = "anonymous";
                break;
            default:
                tableId = "id";
                table = "table";
                break;
        }   

        if (database[table] === undefined) {
            console.log(database);
            return res.status(404).send("Table does not exist");
        }

        // Search by Pk
        const recordPk = await database[table].findByPk(id);

        // Check if the record exists
        if (!recordPk) {
            // Return an error if the record does not exist
            return res.status(404).send("Record not found");
        }

        // Update the record in the database with sequelize
        const updatedRecord = await database[table].update(updatedRecordData, { where: { [tableId]: id } });

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

        let table = "";

        switch (tableName.trim()) {
            case "people":
                table = "people";
                break;
            case "companies":
                table = "company";
                break;
            case "advertissements":
                table = "advertissement";
                break;
            case "jobapplications":
                table = "jobapplication";
                break;
            case "anonymous":
                table = "anonymous";
                break;
            default:
                table = "table";
                break;
        }

        const newRecordData = req.body;

        if (database[table] === undefined || database[table] === null) {
            console.log(database);
            return res.status(404).send('Table does not exists');
        }

        // Create the record in the database with sequelize
        const newRecord = await database[table].create(newRecordData);
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

        let tableId = "";
        let table = "";

        switch (tableName.trim()) {
            case "people":
                tableId = "people_id";
                table = "people";
                break;
            case "companies":
                tableId = "company_id";
                table = "company";
                break;
            case "advertissements":
                tableId = "advertissement_id";
                table = "advertissement";
                break;
            case "jobapplications":
                tableId = "jobapplication_id";
                table = "jobapplication";
                break;
            case "anonymous":
                tableId = "anonymous_id";
                table = "anonymous";
                break;
            default:
                tableId = "id";
                table = "table";
                break;
        }

        if (database[table] === undefined) {
            console.log(database);
            return res.status(404).send('Table does not exists');
        }

        

        // Delete the record from the database with sequelize
        const numRowsDeleted = await database[table].destroy({ where: { [tableId]: id } });

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
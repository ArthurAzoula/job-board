const express = require('express');
const sequelize = require('./src/database/connection.database');
require('dotenv').config();

// import models
require('./src/models/index');

// Create the connection with the database
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

// Syncronize the models with the database
sequelize.sync({ force : true }) // force : true will drop the table if it already exists
    .then(() => {
        console.log('Models synchronized successfully.');
    })
    .catch((error) => {
        console.error('Unable to synchronize the models with the database:', error);
    });

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});



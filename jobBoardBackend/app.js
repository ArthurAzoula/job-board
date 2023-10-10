const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const winston = require('winston');
const sequelize = require('./src/database/connection.database');
const database = require('./src/models/index');
//const advertissementsRoutes = require('./src/routes/advertissement.route')
//const candidaturesRoutes = require('./src/routes/candidatures.route');
//const companiesRoutes = require('./src/routes/companies.route');
//const usersRoutes = require('./src/routes/users.route');
//const authRoutes = require('./src/routes/auth.route');

// Create the Express app
const app = express();

// Set up middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('combined', { stream: winston.stream }));



// Base API
const BASE_API_URL = process.env.BASE_API_URL;

// Define the routes
// app.use(`${BASE_API_URL}advertissements`, advertissementsRoutes);
// app.use(`${BASE_API_URL}candidatures`, candidaturesRoutes);
// app.use(`${BASE_API_URL}companies`, companiesRoutes);
// app.use(`${BASE_API_URL}users`, usersRoutes);
// app.use(`${BASE_API_URL}/auth`, authRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
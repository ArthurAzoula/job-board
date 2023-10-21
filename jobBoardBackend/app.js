const express = require('express');
const database = require('./src/models/index');
const advertissementsRoutes = require('./src/routes/advertissement.route')
const jobapplicationRoutes = require('./src/routes/jobapplication.route');
const companiesRoutes = require('./src/routes/company.route');
const peopleRoutes = require('./src/routes/people.route');
const authRoutes = require('./src/routes/auth.route');
const anonymousRoutes = require('./src/routes/anonymous.route');
const tablesRoutes = require('./src/routes/tables.route');
const dotenv = require('dotenv');
const cors = require('cors');

// Create the Express app
const app = express();

// Authorize request
const corsOption = {origin: 'http://127.0.0.1:5173'};

/**
 * Middleware to parse JSON data from the request body.
 * @name express.json()
 * @function
 * @memberof module:app
 * @inner
 */
app.use(express.json());

/**
 * Middleware to enable CORS for the specified origin.
 * @name cors()
 * @function
 * @memberof module:app
 * @inner
 * @param {Object} corsOption - The CORS options.
 */
app.use(cors(corsOption));

// Define the routes

/**
 * Advertissements routes.
 * @name AdvertissementsRoutes
 * @function
 * @memberof module:app
 * @inner
 */
app.use(`/api/advertissements`, advertissementsRoutes);

/**
 * Job application routes.
 * @name JobApplicationRoutes
 * @function
 * @memberof module:app
 * @inner
 */
app.use(`/api/jobapplications`, jobapplicationRoutes);

/**
 * Companies routes.
 * @name CompaniesRoutes
 * @function
 * @memberof module:app
 * @inner
 */
app.use(`/api/companies`, companiesRoutes);

/**
 * People routes.
 * @name PeopleRoutes
 * @function
 * @memberof module:app
 * @inner
 */
app.use(`/api/users`, peopleRoutes);

/**
 * Authentication routes.
 * @name AuthRoutes
 * @function
 * @memberof module:app
 * @inner
 */
app.use(`/api/auth`, authRoutes);

/**
 * Anonymous routes.
 * @name AnonymousRoutes
 * @function
 * @memberof module:app
 * @inner
 */
app.use(`/api/anonymous`, anonymousRoutes);

/**
 * Tables routes.
 * @name TablesRoutes
 * @function
 * @memberof module:app
 * @inner
 */
app.use(`/api/tables`, tablesRoutes);

/**
 * Test route.
 * @name TestRoute
 * @function
 * @memberof module:app
 * @inner
 */
app.use('/test', (req, res) => {
    res.send('Hello World')
});

// Start the server

/**
 * The port number to listen on.
 * @name PORT
 * @type {number}
 * @memberof module:app
 */
const PORT = process.env.PORT || 3000;

/**
 * Start the server and listen on the specified port.
 * @name app.listen
 * @function
 * @memberof module:app
 * @param {number} PORT - The port number to listen on.
 * @param {Function} callback - The callback function to execute when the server starts.
 */
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
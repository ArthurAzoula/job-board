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

// Set up middleware
app.use(express.json());
app.use(cors(corsOption));

// Define the routes
app.use(`/api/advertissements`, advertissementsRoutes);
app.use(`/api/jobapplications`, jobapplicationRoutes);
app.use(`/api/companies`, companiesRoutes);
app.use(`/api/users`, peopleRoutes);
app.use(`/api/auth`, authRoutes);
app.use(`/api/anonymous`, anonymousRoutes);
app.use(`/api/tables`, tablesRoutes);
app.use('/test', (req, res) => {
    res.send('Hello World')
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
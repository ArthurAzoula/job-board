const express = require('express');
const database = require('./src/models/index');
const advertissementsRoutes = require('./src/routes/advertissement.route')
const jobapplicationRoutes = require('./src/routes/jobapplication.route');
const companiesRoutes = require('./src/routes/company.route');
const peopleRoutes = require('./src/routes/people.route');
const authRoutes = require('./src/routes/auth.route');
const anonymousRoutes = require('./src/routes/anonymous.route');
const dotenv = require('dotenv');

// Create the Express app
const app = express();

// Set up middleware
app.use(express.json());

// Define the routes
app.use(`/advertissements`, advertissementsRoutes);
app.use(`/jobapplications`, jobapplicationRoutes);
app.use(`/companies`, companiesRoutes);
app.use(`/users`, peopleRoutes);
app.use(`/auth`, authRoutes);
app.use(`/anonymous`, anonymousRoutes);
app.use('/test', (req, res) => {
    res.send('Hello World')
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
const express = require('express');

const router = express.Router();

const jobapplication = require('../controllers/jobapplication.controller')

/* GET */
router.get('/', jobapplication.getAllJobApplications);
router.get('/:id', jobapplication.getJobApplicationById);
router.get('/advert/:advertId', jobapplication.getUserJobApplicationFromAnAdvert);
router.get('/user/:userId', jobapplication.getJobApplicationsByUserId);

/* POST */
router.post('/', jobapplication.createJobApplication);  

/* PUT */
router.put('/:id', jobapplication.updateJobApplication);

/* DELETE */
router.delete('/:id', jobapplication.deleteJobApplication);


module.exports = router;
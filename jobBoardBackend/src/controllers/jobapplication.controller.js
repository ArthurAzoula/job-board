const database = require('../models/index');

/**
 * Gets all job applications from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the job applications.
 */
const getAllJobApplications = async (req, res) => {
    try {
        const jobApplication = await database.sequelize.models.jobapplication.findAll();
        if (jobApplication) {
            return res.status(200).json(jobApplication);
        }
        return res.status(404).send('JobApplications do not exist');
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

/**
 * Gets all job applications for a specific user from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the job applications.
 */
const getJobApplicationsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const jobApplications = await database.sequelize.models.jobapplication.findAll({
            where: { people_id: userId },
        });
        if (jobApplications) {
            return res.status(200).json(jobApplications);
        }
        return res.status(404).send('JobApplications do not exist');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Gets a job application by ID from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the job application.
 */
const getJobApplicationById = async (req, res) => {
    try {
        const jobApplicationId = req.params.id;
        const jobApplication = await database.sequelize.models.jobapplication.findOne({
            where: { jobapplication_id: jobApplicationId }
        })
        if (jobApplication) {
            return res.status(200).json(jobApplication);
        }
        return res.status(404).send('JobApplication with the specified ID does not exist');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

/**
 * Gets all job applications for a specific advertisement from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the job applications.
 */
const getUserJobApplicationFromAnAdvert = async (req, res) => {
    try {
        const advertId = req.params.advertId;
        const jobApplication = await database.sequelize.models.jobapplication.findAll({
            where: { advertissement_id: advertId }
        })
        if (jobApplication) {
            return res.status(200).json(jobApplication);
        }
        return res.status(404).send('JobApplication with the specified ID does not exist');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

/**
 * Creates a new job application in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the created job application.
 */
const createJobApplication = async (req, res) => {
    try {
        const jobApplication = await database.sequelize.models.jobapplication.create(req.body);
        if (jobApplication) {
            return res.status(201).json(jobApplication);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
} 

/**
 * Updates a job application in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the updated job application.
 */
const updateJobApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await database.sequelize.models.jobapplication.update(req.body, {
            where: { jobapplication_id: Number(id) }
        });
        if (updated) {
            const updatedJobApplication = await database.sequelize.models.jobapplication.findOne({
                where: { jobapplication_id: Number(id) }
            });
            return res.status(200).json({ jobApplication: updatedJobApplication });
        }
        return res.status(404).send('JobApplication with the specified ID does not exist');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

/**
 * Deletes a job application from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with a success message.
 */
const deleteJobApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await database.sequelize.models.jobapplication.destroy({
            where: { jobapplication_id: Number(id) }
        });
        if (deleted) {
            return res.status(204).send("JobApplication deleted");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllJobApplications,
    getJobApplicationById,
    createJobApplication,
    updateJobApplication,
    deleteJobApplication,
    getUserJobApplicationFromAnAdvert,
    getJobApplicationsByUserId
}
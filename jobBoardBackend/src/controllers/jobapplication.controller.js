const database = require('../models/index');

const getAllJobApplications = async (req, res) => {
    try {
        const jobApplication = await database.sequelize.models.jobapplication.findAll();
        if (jobApplication) {
            return res.status(200).json(jobApplication);
        }
        return res.status(404).send('JobApplications does not exists');
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getJobApplicationById = async (req, res) => {
    try {
        const jobApplicationId = req.params.id;
        const jobApplication = await database.sequelize.models.jobapplication.findOne({
            where: { jobapplication_id: jobApplicationId }
        })
        if (jobApplication) {
            return res.status(200).json(jobApplication);
        }
        return res.status(404).send('JobApplication with the specified ID does not exists');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    

}

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

const updateJobApplication = async (req, res) => {

}

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
    deleteJobApplication
}
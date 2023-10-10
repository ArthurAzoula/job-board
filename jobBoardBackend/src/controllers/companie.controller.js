const database = require('../models/index');

const getAllCompany = async (req, res) => {
    try {
        const company = await database.sequelize.models.company.findAll();
        if (company) {
            return res.status(200).json(company);
        }
        return res.status(404).send('Company does not exists');
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await database.sequelize.models.company.findOne({
            where: { company_id: companyId }
        })
        if (company) {
            return res.status(200).json(company);
        }
        return res.status(404).send('Company with the specified ID does not exists');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const createCompany = async (req, res) => {
    try {
        const company = await database.sequelize.models.company.create(req.body);
        if (company) {
            return res.status(201).json(company);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateCompany = async (req, res) => {

}

const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await database.sequelize.models.company.destroy({
            where: { company_id: Number(id) }
        });
        if (deleted) {
            return res.status(204).send("Company deleted");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllCompany,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
}
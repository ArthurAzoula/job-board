const database = require('../models/index');
const { Op } = require("sequelize");

const getAllAdvertissements = async (req, res) => {
    try {
        const advertissement = await database.sequelize.models.advertissement.findAll();
        if (advertissement) {
            return res.status(200).json(advertissement);
        }
        return res.status(404).send('Advertissements does not exists');
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getAdvertissementById = async (req, res) => {
    try {
        const { id } = req.params;
        const advertissement = await database.sequelize.models.advertissement.findByPk(Number(id));
        if (advertissement) {
            return res.status(200).json(advertissement);
        }
        return res.status(404).send('Advertissement with the specified ID does not exists');
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getAdvertissementByCompany = async (req, res) => {
    try {
        
        const { companyId } = req.params
        const advertissements = await database.sequelize.models.advertissement.findAll({
            where: { company_id: companyId }
        }) 

        if (advertissements) {
            return res.status(200).json(advertissements);
        }

        return res.status(404).send('The company does not have any advertissements');

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getAdvertissementFilters = async (req, res) => {
    try {
        
        const { keywords, contract, city } = req.query;

        //(keywords, contract, city);

        const whereClause = {};

        if (keywords) {
            // titre contains keywords
            whereClause.titre = {
                [database.Sequelize.Op.like]: `%${keywords}%`
            };
        }

        if (contract) {
            whereClause.type_contrat = contract;
        }

        if (city) {
            // Where lieu contains city
            whereClause.lieu = {
                [database.Sequelize.Op.like]: `%${city}%`
            };
        }

        // Check for all filters
        const advertissements = await database.sequelize.models.advertissement.findAll({
            where: whereClause
        });
        
        if (advertissements) {
            return res.status(200).json(advertissements);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const createAdvertissement = async (req, res) => {
    try {
        const advertissement = await database.sequelize.models.advertissement.create(req.body);
        if (advertissement) {
            return res.status(201).json(advertissement);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateAdvertissement = async (req, res) => {

}

const deleteAdvertissement = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await database.sequelize.models.advertissement.destroy({
            where: { advertissement_id: Number(id) }
        });
        if (deleted) {
            return res.status(204).send("Advertissement deleted");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllAdvertissements,
    createAdvertissement,
    updateAdvertissement,
    deleteAdvertissement,
    getAdvertissementById,
    getAdvertissementFilters,
    getAdvertissementByCompany
}
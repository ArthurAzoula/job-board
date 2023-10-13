const database = require('../models/index');

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

const createAdvertissement = async (req, res) => {
    try {
        console.log(req.body);
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
    deleteAdvertissement
}
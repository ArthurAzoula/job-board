const database = require('../models/index');

/**
 * Get all advertisements
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Response object with advertisements or error message
 */
const getAllAdvertisements = async (req, res) => {
    try {
        const advertisements = await database.sequelize.models.advertisement.findAll();
        if (advertisements) {
            return res.status(200).json(advertisements);
        }
        return res.status(404).send('Advertisements do not exist');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Get advertisement by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Response object with advertisement or error message
 */
const getAdvertisementById = async (req, res) => {
    try {
        const { id } = req.params;
        const advertisement = await database.sequelize.models.advertisement.findByPk(Number(id));
        if (advertisement) {
            return res.status(200).json(advertisement);
        }
        return res.status(404).send('Advertisement with the specified ID does not exist');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Get advertisements by company ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Response object with advertisements or error message
 */
const getAdvertisementsByCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        const advertisements = await database.sequelize.models.advertisement.findAll({
            where: { company_id: companyId }
        });
        if (advertisements) {
            return res.status(200).json(advertisements);
        }
        return res.status(404).send('The company does not have any advertisements');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Get advertisements with filters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Response object with advertisements or error message
 */
const getAdvertisementFilters = async (req, res) => {
    try {
        const { keywords, contract, city } = req.query;
        const whereClause = {};
        if (keywords) {
            whereClause.titre = {
                [database.Sequelize.Op.like]: `%${keywords}%`
            };
        }
        if (contract) {
            whereClause.type_contrat = contract;
        }
        if (city) {
            whereClause.lieu = {
                [database.Sequelize.Op.like]: `%${city}%`
            };
        }
        const advertisements = await database.sequelize.models.advertisement.findAll({
            where: whereClause
        });
        if (advertisements) {
            return res.status(200).json(advertisements);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Create advertisement
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Response object with created advertisement or error message
 */
const createAdvertisement = async (req, res) => {
    try {
        const advertisement = await database.sequelize.models.advertisement.create(req.body);
        if (advertisement) {
            return res.status(201).json(advertisement);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Update advertisement by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Response object with updated advertisement or error message
 */
const updateAdvertisement = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await database.sequelize.models.advertisement.update(req.body, {
            where: { advertisement_id: Number(id) }
        });
        if (updated) {
            const updatedAdvertisement = await database.sequelize.models.advertisement.findOne({
                where: { advertisement_id: Number(id) }
            });
            return res.status(200).json({ advertisement: updatedAdvertisement });
        }
        return res.status(404).send('Advertisement with the specified ID does not exist');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Delete advertisement by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Response object with success message or error message
 */
const deleteAdvertisement = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await database.sequelize.models.advertisement.destroy({
            where: { advertisement_id: Number(id) }
        });
        if (deleted) {
            return res.status(204).send('Advertisement deleted');
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllAdvertisements,
    createAdvertisement,
    updateAdvertisement,
    deleteAdvertisement,
    getAdvertisementById,
    getAdvertisementFilters,
    getAdvertisementsByCompany
};
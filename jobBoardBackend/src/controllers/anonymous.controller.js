const database = require('../models/index');

const create = async (req, res) => {
    try {
        const anonymous = await database.sequelize.models.anonymous.create(req.body);
        return res.status(200).json({ anonymous });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const findAll = async (req, res) => {
    try {
        const anonymousList = await database.sequelize.models.anonymous.findAll();
        return res.status(200).json({ anonymousList });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const findOne = async (req, res) => {
    try {
        const anonymousId = req.params.id;
        const anonymous = await database.sequelize.models.anonymous.findByPk(anonymousId);
        if (!anonymous) {
            return res.status(404).send('Anonymous not found');
        }
        return res.status(200).json({ anonymous });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const findAnonymousByEmail = async (req, res) => {
    try {
        const anonymousEmail = req.params.email;
        const anonymous = await database.sequelize.models.anonymous.findOne({ where: { email: anonymousEmail } });
        if (!anonymous) {
            return res.status(404).send('Anonymous not found');
        }
        return res.status(200).json({ anonymous });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const anonymousId = req.params.id;
        const { name, email } = req.body;
        const anonymous = await database.sequelize.models.anonymous.findByPk(anonymousId);
        if (!anonymous) {
            return res.status(404).send('Anonymous not found');
        }
        anonymous.name = name;
        anonymous.email = email;
        await anonymous.save();
        return res.status(200).json({ anonymous });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const anonymousId = req.params.id;
        const anonymous = await database.sequelize.models.anonymous.findByPk(anonymousId);
        if (!anonymous) {
            return res.status(404).send('Anonymous not found');
        }
        await anonymous.destroy();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    create,
    findAll,
    findAnonymousByEmail,
    findOne,
    update,
    remove
};
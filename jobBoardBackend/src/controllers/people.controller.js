const database = require('../models/index');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

const getAllUsers = async (req, res) => {
    try {
        const users = await database.sequelize.models.people.findAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await database.sequelize.models.people.findByPk(Number(id));
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).send('User with the specified ID does not exists');
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


const createUser = async (req, res) => {
    try {
        // Check email is not already used
        const email = req.body.email;
        const userAlreadyExist = await database.sequelize.models.people.findOne({ where: { email: email } });
        if (userAlreadyExist) {
            return res.status(409).send('Email already used');
        }
        const user = await database.sequelize.models.people.create(req.body);
        if (user) {
            console.log(`Un utilisateur de type client a été créé :${user}}`)
            return res.status(201).json(user);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


const updateUser = async (req, res) => {
    try {
        const user = await database.sequelize.models.people.update(req.body, {
            where: { people_id: Number(req.params.id) }
        });
        if (user) {
            const updatedUser = await database.sequelize.models.people.findByPk(Number(req.params.id));
            return res.status(200).json(updatedUser);
        }
        return res.status(404).send('User with the specified ID does not exists');
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await database.sequelize.models.people.destroy({
            where: { people_id: Number(id) }
        });
        if (deleted) {
            return res.status(204).send("User deleted");
        }
        throw new Error("User not found");
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    createUser
}
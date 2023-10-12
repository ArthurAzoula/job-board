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

const getUserConnected = async (req, res) => {
    try {
        const { token } = req.params;

        // On décode le token
        const decodedToken = jwt.verify(token, jwtConfig.secret);
        // On récupère l'id de l'utilisateur
        const userId = decodedToken.id;

        // On cherche l'utilisateur correspondant dans la base de donnée
        const user = await database.sequelize.models.people.findByPk(userId)

        const company = await database.sequelize.models.company.findByPk(userId);

        if (user && !company) {
            return res.status(200).json(user);
        }

        if (company && !user) {
            return res.status(200).json(company);
        }

        return res.status(404).send('User with the specified ID does not exists');
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

const createUser = async (req, res) => {
    try {
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
    getUserConnected,
    updateUser,
    deleteUser,
    createUser
}
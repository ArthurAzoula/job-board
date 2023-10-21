const database = require('../models/index');

/**
 * Gets all users from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the users.
 */
const getAllUsers = async (req, res) => {
    try {
        const users = await database.sequelize.models.people.findAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

/**
 * Gets a user by ID from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the user.
 */
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await database.sequelize.models.people.findByPk(Number(id));
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).send('User with the specified ID does not exist');
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

/**
 * Creates a new user in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the created user.
 */
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
            console.log(`A client user has been created: ${user}}`)
            return res.status(201).json(user);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

/**
 * Updates a user in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the updated user.
 */
const updateUser = async (req, res) => {
    try {
        const user = await database.sequelize.models.people.update(req.body, {
            where: { people_id: Number(req.params.id) }
        });
        if (user) {
            const updatedUser = await database.sequelize.models.people.findByPk(Number(req.params.id));
            return res.status(200).json(updatedUser);
        }
        return res.status(404).send('User with the specified ID does not exist');
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

/**
 * Deletes a user from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with a success message.
 */
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
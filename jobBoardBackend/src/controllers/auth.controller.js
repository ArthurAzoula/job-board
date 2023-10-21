const database = require('../models/index');
const bcrypt = require('bcrypt');
const ms = require('ms');

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

/**
 * Authenticates a user and generates access and refresh tokens.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the access and refresh tokens.
 */
const login = async (req, res) => {
    try {
        let type = '';

        // Check if the user exists in the people table
        const user = await database.sequelize.models.people.findOne({
            where: { email: req.body.email }
        });

        // Check if the user exists in the company table
        const company = await database.sequelize.models.company.findOne({
            where: { email: req.body.email }
        });

        // If the user is not found in either table, return a 404 error
        if (!user && !company) {
            return res.status(404).send('Utilisateur non trouvé !');
        }

        // If the user is found in the company table but not in the people table, set the type to 'company'
        if (company && !user) {
            type = 'company';

            // Check if the password is valid
            const validPassword = await bcrypt.compare(req.body.password, company.password);
            if (!validPassword) {
                return res.status(401).send('Mot de passe incorrecte !');
            }

            // Generate access and refresh tokens for the company
            const accessToken = jwt.sign({ id: company.company_id }, jwtConfig.secret, {
                expiresIn: jwtConfig.options.expiresIn
            });
            const refreshToken = jwt.sign({ id: company.company_id }, jwtConfig.refreshSecret, {
                expiresIn: jwtConfig.refreshOptions.expiresIn
            });

            // Put the token in a cookie
            res.cookie('token', accessToken, { maxAge: ms(jwtConfig.options.expiresIn), httpOnly: true, secure: true, sameSite: 'strict' });

            // Return the access and refresh tokens along with the type
            return res.status(200).json({ type, accessToken, refreshToken });
        }

        // If the user is found in the people table but not in the company table, set the type to 'user'
        if (user && !company) {
            type = 'user';

            // Check if the password is valid
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(401).send('Password not valid');
            }

            // Generate access and refresh tokens for the user
            const accessToken = jwt.sign({ id: user.people_id }, jwtConfig.secret, {
                expiresIn: jwtConfig.options.expiresIn
            });
            const refreshToken = jwt.sign({ id: user.people_id }, jwtConfig.refreshSecret, {
                expiresIn: jwtConfig.refreshOptions.expiresIn
            });

            // Put the token in a cookie
            res.cookie('token', accessToken, { maxAge: ms(jwtConfig.options.expiresIn), httpOnly: true, secure: true, sameSite: 'strict' });

            // Return the access and refresh tokens along with the type
            return res.status(200).json({ type, accessToken, refreshToken });
        }

        // If the user is found in both tables, return a 500 error
        return res.status(500).send('User found in both tables');

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Logs out a user by clearing the token cookie.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with a success message.
 */
const logout = async (req, res) => {
    try {
        res.cookie('token', '', { maxAge: 0, httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(200).send('User logout');
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

/**
 * Gets the connected user's information.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the connected user's information.
 */
const getUserConnected = async (req, res) => {
    try {
        const { type, token } = req.params;

        // Decode the token
        const decodedToken = jwt.verify(token, jwtConfig.secret);

        console.log(decodedToken);

        // Get the user's ID
        const userId = decodedToken.id;

        let user = null;
        let company = null;

        if (type === 'user') {
            // Find the corresponding user in the database
            user = await database.sequelize.models.people.findByPk(userId)
        }

        if (type === 'company') {
            // Find the corresponding company in the database
            company = await database.sequelize.models.company.findByPk(userId)
        }

        if (user) {
            return res.status(200).json(user);
        }

        if (company) {
            return res.status(200).json(company);
        }

        return res.status(404).send('User with the specified ID does not exists');

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

/**
 * Generates a new access token using a refresh token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the new access token.
 */
const refresh = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            return res.status(401).send('Refresh token not provided');
        }
        const decoded = jwt.verify(refreshToken, jwtConfig.refreshSecret);
        const user = await database.sequelize.models.people.findOne(decoded.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const accessToken = jwt.sign({ id: user.id }, jwtConfig.secret, {
            expiresIn: jwtConfig.options.expiresIn
        });
        return res.status(200).json({ accessToken });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    login,
    logout,
    refresh,
    getUserConnected
}
const database = require('../models/index');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');


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
            return res.status(404).send('User not found');
        }

        // If the user is found in the company table but not in the people table, set the type to 'company'
        if (company && !user) {
            type = 'company';

            // Check if the password is valid
            const validPassword = await bcrypt.compare(req.body.password, company.password);
            if (!validPassword) {
                return res.status(401).send('Password not valid');
            }

            // Generate access and refresh tokens for the company
            const accessToken = jwt.sign({ id: company.company_id }, jwtConfig.secret, {
                expiresIn: jwtConfig.options.expiresIn
            });
            const refreshToken = jwt.sign({ id: company.company_id }, jwtConfig.refreshSecret, {
                expiresIn: jwtConfig.refreshOptions.expiresIn
            });

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

            // Return the access and refresh tokens along with the type
            return res.status(200).json({ type, accessToken, refreshToken });
        }

        // If the user is found in both tables, return a 500 error
        return res.status(500).send('User found in both tables');

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const logout = async (req, res) => {
    try {
        res.cookie('token', '', { maxAge: 0, httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(200).send('User logout');
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getUserConnected = async (req, res) => {
    try {
        const { token } = req.params;

        // On décode le token
        const decodedToken = jwt.verify(token, jwtConfig.secret);

        console.log(decodedToken);

        // On récupère l'id de l'utilisateur
        const userId = decodedToken.id;

        console.log(userId);

        // On cherche l'utilisateur correspondant dans la base de donnée
        const user = await database.sequelize.models.people.findByPk(userId)

        const company = await database.sequelize.models.company.findByPk(userId);

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
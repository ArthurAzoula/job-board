const database = require('../models/index');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');


const login = async (req, res) => {
    try {
        const user = await database.sequelize.models.people.findOne({
            where: { email: req.body.email }
        });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send('Password not valid');
        }
        const accessToken = jwt.sign({ id: user.id }, jwtConfig.secret, {
            expiresIn: jwtConfig.options.expiresIn
        });
        const refreshToken = jwt.sign({ id: user.id }, jwtConfig.refreshSecret, {
            expiresIn: jwtConfig.refreshOptions.expiresIn
        });
        return res.status(200).json({ user, accessToken, refreshToken });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }   
}

const register = async (req, res) => {
    // mdp encrypt
    const salt = bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    try {
        const userData = {
            ...req.body,
            password: hashPassword
        };
        newUser = await database.sequelize.models.people.create(userData);
        delete userData.password;
        console.log(`Nouvelle utilisateur dans la base de données : ${newUser.nom}`)
    } catch (error) {
        console.log(`Erreur lors de la création de l'utilisateur : ${error}`)
        res.status(409).json({ error: error.message });
    }
}

const logout = async (req, res) => {
    try {
        res.cookie('token', '', { maxAge: 0, httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(200).send('User logout');
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
        const user = await database.sequelize.models.people.findByPk(decoded.id);
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
    register,
    logout,
    refresh
}
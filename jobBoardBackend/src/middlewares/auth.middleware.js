const database = require('../models/index');

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

const validToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1] || req.cookies.token;
        const decodedToken = jwt.verify(token, jwtConfig.secret);
        const user = await database.sequelize.models.people.findOne({
            where: { id: decodedToken.id }
        });
        const company = await database.sequelize.models.company.findOne({
            where: { id: decodedToken.id }
        });

        if (!user && !company) {
            return res.status(404).send('User and company not found');
        }
        if (user && !company) {
            req.user = user;
            next();
        }
        if (!user && company) {
            req.company = company;
            next();
        }
    
    } catch (error) {
        return res.status(401).json({ error: error.message })
    }
}

module.exports = { validToken };
const crypto = require('crypto');

const generateSecretToken = () => {
    return crypto.randomBytes(64).toString('hex');
};

const generateRefreshToken = () => {
    return crypto.randomBytes(128).toString('hex');
};

const secret = generateSecretToken();

const options = {
    expiresIn: '1d'
};

const refreshOptions = {
    expiresIn: '7d'
};

const refreshSecret = generateRefreshToken();

module.exports = {
    secret,
    options,
    refreshOptions,
    refreshSecret
};

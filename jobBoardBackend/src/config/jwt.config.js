const crypto = require('crypto');

/**
 * Generates a secret token.
 * @name generateSecretToken
 * @function
 * @memberof module:jwtConfig
 * @returns {string} The secret token.
 */
const generateSecretToken = () => {
    return crypto.randomBytes(64).toString('hex');
};

/**
 * Generates a refresh token.
 * @name generateRefreshToken
 * @function
 * @memberof module:jwtConfig
 * @returns {string} The refresh token.
 */
const generateRefreshToken = () => {
    return crypto.randomBytes(128).toString('hex');
};

/**
 * The secret token.
 * @name secret
 * @type {string}
 * @memberof module:jwtConfig
 */
const secret = generateSecretToken();

/**
 * The options for the access token.
 * @name options
 * @type {Object}
 * @memberof module:jwtConfig
 * @property {string} expiresIn - The expiration time for the access token.
 */
const options = {
    expiresIn: '1d'
};

/**
 * The options for the refresh token.
 * @name refreshOptions
 * @type {Object}
 * @memberof module:jwtConfig
 * @property {string} expiresIn - The expiration time for the refresh token.
 */
const refreshOptions = {
    expiresIn: '7d'
};

/**
 * The refresh token.
 * @name refreshSecret
 * @type {string}
 * @memberof module:jwtConfig
 */
const refreshSecret = generateRefreshToken();

module.exports = {
    secret,
    options,
    refreshOptions,
    refreshSecret
};
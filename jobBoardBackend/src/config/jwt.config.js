import crypto from 'crypto';

const generateSecretToken = () => {
    return crypto.randomBytes(64).toString('hex');
};

const generateRefreshToken = () => {
    return crypto.randomBytes(128).toString('hex');
};

export const secret = generateSecretToken();

export const options = {
    expiresIn: '1h'
};

export const refreshOptions = {
    expiresIn: '7d'
};

export const refreshSecret = generateRefreshToken();

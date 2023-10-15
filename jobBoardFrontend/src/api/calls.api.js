import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const getAllAdvertisements = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/advertissements`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getAdvertisementById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/advertissements/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getUserConnected = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/me/${token}`)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getAnonymousUserByEmail = async (email) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/anonymous/email/${email}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
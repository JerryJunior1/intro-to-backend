import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    withCredentials: true, // If using cookies, otherwise remove
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Adjust if your backend expects different scheme
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;

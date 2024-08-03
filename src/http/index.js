import axios from "axios";

export const API_URL = 'http://127.0.0.1:8000';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `JWT ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    }, 
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.post(`${API_URL}/api/accounts/auth/jwt/refresh/`, 
                    { refresh: localStorage.getItem('refresh') }, 
                    { withCredentials: true }
                  );
                localStorage.setItem('token', response.data.access);
                originalRequest.headers.Authorization = `JWT ${response.data.access}`;
                return $api(originalRequest);
            } catch (err) {
                console.error('Token refresh failed', err);
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default $api;

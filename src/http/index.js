import axios from "axios";

export const API_URL = 'http://localhost:8000';//http://192.168.100.22:8000

const excludedUrls = ['/api/accounts/auth/login/', '/api/accounts/auth/google/', '/api/accounts/auth/token/verify/'];


const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});


$api.interceptors.request.use((config) => {
    if (!excludedUrls.includes(config.url)) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
});

$api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const response = await axios.post(
                    `${API_URL}/api/accounts/auth/token/refresh/`,
                    {},
                    { withCredentials: true }
                );
                const newToken = response.data.access;
                localStorage.setItem("token", newToken)

                return $api(originalRequest);
            } catch (err) {
                if (err.response.status === 401) {
                    window.location.href = "/";
                }
                console.error('Token refresh failed', err);
                return Promise.reject(err);
            }
        }
        
        return Promise.reject(error);
    }
);

export default $api;

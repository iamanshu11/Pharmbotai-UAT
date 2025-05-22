import axios from 'axios';

let navigateToLogin = null; // Placeholder for the navigation function

export const setNavigateToLogin = (navigateFn) => {
    navigateToLogin = navigateFn; // Set the navigation function
};

// Create axios instance with default config
const api = axios.create({
    timeout: 20000, // 20 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        console.log(`Request: ${config.method.toUpperCase()} ${config.url}`, {
            headers: config.headers,
            data: config.data,
        });
        return config;
    },
    (error) => {
        console.error('Request error:', error.message);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        console.log('Response:', response.status, response.data);
        return response.data;
    },
    (error) => {
        if (error.response) {
            console.error('Error Response:', error.response.status, error.response.data);
            if (error.response.status === 401) {
                console.error('Unauthorized: Invalid token');
                if (navigateToLogin) {
                    navigateToLogin(); // Redirect to login
                } else {
                    console.error('Navigation function is not set.');
                }
            }
            return Promise.reject(new Error(error.response.data.message || 'API Error'));
        } else if (error.request) {
            console.error('No Response:', error.message);
            return Promise.reject(new Error('No response from server'));
        } else {
            console.error('Request Setup Error:', error.message);
            return Promise.reject(error);
        }
    }
);

const apiService = {
    /**
     * Make a GET request
     */
    get: (url, config = {}) => {
        return api.get(url, config).catch((error) => {
            console.error('GET Error:', error.message);
            throw error;
        });
    },

    /**
     * Make a POST request
     */
    post: (url, data = {}, config = {}) => {
        return api.post(url, data, config).catch((error) => {
            console.error('POST Error:', error.message);
            throw error;
        });
    },

    /**
     * Make a PUT request
     */
    put: (url, data = {}, config = {}) => {
        return api.put(url, data, config).catch((error) => {
            console.error('PUT Error:', error.message);
            throw error;
        });
    },

    /**
     * Make a DELETE request
     */
    delete: (url, config = {}) => {
        return api.delete(url, config).catch((error) => {
            console.error('DELETE Error:', error.message);
            throw error;
        });
    },
};

export default apiService;
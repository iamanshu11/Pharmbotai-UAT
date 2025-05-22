
import config from '../config/env';
import apiService from '../services/apiService';
export const historyApi = {
    async getHistory(token) {
        const url = `${config.api.baseUrl}${config.api.endpoints.query.history}`;
        try {
            console.log('Fetching history from:', url);
            const response = await apiService.post(url, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        } catch (error) {
            console.error('Fetch Profile Error:', error.message);
            throw error;
        }
    },

};
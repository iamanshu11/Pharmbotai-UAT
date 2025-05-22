import config from '../config/env';
import apiService from '../services/apiService';

export const chatApi = {
    async submitQuery(token, question) {
        const url = `${config.api.baseUrl}${config.api.endpoints.query.submit}`;
        try {
            console.log('Submitting query to:', url);
            const response = await apiService.post(
                url,
                { question },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response;
        } catch (error) {
            console.error('Submit Query Error:', error.message);
            throw error;
        }
    },
};

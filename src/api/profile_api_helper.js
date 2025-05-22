import config from '../config/env';
import apiService from '../services/apiService';

export const profileApi = {
    async getProfile(token) {
        const url = `${config.api.baseUrl}${config.api.endpoints.auth.profile}`;
        try {
            console.log('Fetching profile from:', url);
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

    async updateProfileName(token, newName) {
        const url = `${config.api.baseUrl}${config.api.endpoints.auth.updateProfile}`;
        console.log('Updating profile name to:', newName, 'at:', url);
        try {
            const response = await apiService.put(
                url, { name: newName }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
            );
            return response;
        } catch (error) {
            console.error('Update Profile Error:', error.message);
            throw error;
        }
    },
};
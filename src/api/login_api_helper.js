import apiService from '../services/apiService';
import config from '../config/env';

const API_BASE_URL = config.api.baseUrl;
const ENDPOINTS = config.api.endpoints.auth;

export const authApi = {
  /**
   * Login user
   * @param {string} username - Username
   * @param {string} password - Password
   * @returns {Promise<object>} Login response with token
   * @example
   * {
   *   "success": true,
   *   "data": {
   *     "user": {
   *       "id": "be460614-e9fa-4374-994c-4b7b4b174137",
   *       "pharmacy_id": "c0eb6f38-2df6-415b-8ab1-5ca38a37a609",
   *       "username": "jane.admin",
   *       "role": "admin",
   *       "is_active": true,
   *       "created_at": "2025-04-21T06:19:42.741Z",
   *       "updated_at": "2025-04-21T06:19:42.741Z"
   *     },
   *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *   }
   * }
   */
  async login(username, password) {
    try {
      console.log('Making login API call to:', `${API_BASE_URL}${ENDPOINTS.login}`);
      console.log('Login request data:', { username, password });

      const response = await apiService.post(`${API_BASE_URL}${ENDPOINTS.login}`,
        { username, password }
      );
      console.log('Login response:', response);

      // Check if response exists
      if (!response) {
        throw new Error('No response received from server');
      }

      // Check if response has the expected structure
      if (response.success && response.data) {
        // Store token in localStorage if it exists
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          return response;
        } else {
          console.error('Token missing in response:', response);
          throw new Error('Invalid response format: missing token');
        }
      } else {
        console.error('Invalid login response:', response);
        throw new Error('Invalid login response from server');
      }
    } catch (error) {
      console.error('Login Error:', error);
      if (error.response) {
        console.error('Error response:', error.response);
      }
      throw error;
    }
  },

  /**
   * Logout user
   * @param {string} token - Auth token
   * @returns {Promise<void>}
   */
  async logout(token) {
    try {
      console.log('Making logout API call to:', `${API_BASE_URL}${ENDPOINTS.logout}`);
      const response = await apiService.post(`${API_BASE_URL}${ENDPOINTS.logout}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Logout Response:', response);

      // Clear token from localStorage
      localStorage.removeItem('token');
      return response;
    } catch (error) {
      console.error('Logout Error:', error);
      // Still clear the token even if the API call fails
      localStorage.removeItem('token');
      throw error;
    }
  },

  /**
   * Get user profile settings
   * @param {string} token - Auth token
   * @returns {Promise<object>} Profile data including user and pharmacy information
   */
  async getProfile(token) {
    const url = `${API_BASE_URL}${ENDPOINTS.profile}`;
    return apiService.get(url, {
      Authorization: `Bearer ${token}`
    });
  }
};

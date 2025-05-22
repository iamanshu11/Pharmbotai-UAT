import config from '../config/env';
import apiService from '../services/apiService';

export const adminDetailsPharmacyApi = {
  async fetchPharmacies() {
    const url = `${config.api.baseUrl}${config.api.endpoints.admin.pharmacy}`;
    try {
      const response = await apiService.post("https://5a25-2409-40c2-11e-db14-44ae-65ef-5ecb-b22c.ngrok-free.app/api/public/pharmacies", {}, {
      });
      console.log(response)
      return response;
    } catch (error) {
      console.error('Fetch Pharmacies Error:', error.message);
      throw error;
    }
  },
}; 


// import config from '../config/env';
// import apiService from '../services/apiService';

// export const adminDetailsPharmacyApi = {
//   async fetchPharmacies() {
//     const url = `${config.api.baseUrl}/public/pharmacies`;
//     try {
//       const response = await apiService.get(url, {
//         headers: {
//         },
//       });
//       return response;
//     } catch (error) {
//       console.error('Fetch Pharmacies Error:', error.message);
//       throw error;
//     }
//   },
// };
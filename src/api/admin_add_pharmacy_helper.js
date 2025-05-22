// import config from '../config/env';
// import apiService from '../services/apiService';

// export const adminPharmacyApi = {
//   async addPharmacy(pharmacyData) {
//     const url = `${config.api.baseUrl}${config.api.endpoints.admin.pharmacy}`;
//     try {
//       const response = await apiService.post(
//         "https://baa8-2409-40c2-11e-db14-8519-2111-7b8a-937a.ngrok-free.app/api/admin/pharmacy",
//         pharmacyData,
//         {
//           headers: {
//             username: config.api.auth.username,
//             password: config.api.auth.password,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       return response;
//     } catch (error) {
//       console.error('Add Pharmacy Error:', error.message);
//       throw error;
//     }
//   },
// };

import config from '../config/env';
import apiService from '../services/apiService';

export const adminPharmacyApi = {
  async addPharmacy(pharmacyData) {
    const url = `${config.api.baseUrl}${config.api.endpoints.admin.pharmacy}`;
    try {
      const response = await apiService.post(
        url,
        pharmacyData,
        {
          headers: {
            username: config.api.auth.username,
            password: config.api.auth.password,
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (error) {
      console.error('Add Pharmacy Error:', error.message);
      throw error;
    }
  },
};

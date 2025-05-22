// const config = {
//     api: {
//         baseUrl: 'https://aivae.pharmbotai.com/api',
//         endpoints: {
//             auth: {
//                 login: '/auth/login',
//                 logout: '/auth/logout',
//                 profile: '/profile/me',
//                 updateProfile: '/profile/update',
//                 history: '/query/history',
//             },
//             query: {
//                 history: '/query/history',
//                 submit: '/query/submit',
//             }
//         },
//     },

// };

// export default config;

const config = {
    api: {
      baseUrl: 'https://5a25-2409-40c2-11e-db14-44ae-65ef-5ecb-b22c.ngrok-free.app/api',
      auth: {
        // static admin creds for the pharmacy endpoint
        username: 'itsupport@pharmbotai.com',
        password: 'Password@2025',
      },
      endpoints: {
        auth: {
          login: '/auth/login',
          logout: '/auth/logout',
          profile: '/profile/me',
          updateProfile: '/profile/update',
          history: '/query/history',
        },
        query: {
          history: '/query/history',
          submit: '/query/submit',
        },
        admin: {
          pharmacy: '/admin/pharmacy',
        },
      },
    },
  };
  
  export default config;
  
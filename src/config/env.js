const config = {
    api: {
        baseUrl: 'https://aivae.pharmbotai.com/api',
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
            }
        },
    },

};

export default config;


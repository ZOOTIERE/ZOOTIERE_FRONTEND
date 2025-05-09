export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/users/login/',
        REGISTER: '/api/users/register/'
    },
    FINCAS: {
        CREATE: '/api/farms/',
        LIST: '/api/farms/',
        FARMBYUD: (id: string) => `/api/farms/${id}/`,
        LISTBYID: (id: string) => `/api/farms/user/${id}/`,
        LISTBYNAME: (name: string) => `/api/farms/name/${name}`,
    },
    ANIMAL: {
        CREATE: '/api/animals/',
        LISTBYID: (id: string) => `/api/animals/${id}/`,
        LISTBYFINCA: (id: string) => `/api/animals/finca/${id}/`,
    },
    VACCINES: {
        CREATE: '/api/vaccines/',
        GETANIMALVACCINES: (id: string) => `/api/vaccines/animal/${id}/`,

    },
    FEED: {
        CREATE: '/api/feed/',
        GETANIMALFEED: (id: string) => `/api/feed/animal/${id}/`,
    },
    WORKERS: {
        CREATE: '/api/workers/',
        LIST: '/api/workers/',
        LISTBYID: (id: string) => `/api/workers/${id}/`,
    }
} as const;
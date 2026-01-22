export const envConfig = () => {
    return {
        VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
        VITE_API_TIMEOUT: import.meta.env.VITE_API_TIMEOUT,
    };
};

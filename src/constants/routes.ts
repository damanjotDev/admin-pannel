export const ROUTES = {
    ROOT: '/',

    // Main Routes
    HOME: '/home',

    // Auth Routes
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password/:token',

    //Order Routes
    CREATE_ORDER: '/orders/create-order',
    UPDATE_ORDER: '/orders/update-order/:orderId',
} as const;

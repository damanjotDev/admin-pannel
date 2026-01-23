export const ORDER_ACTIONS = {
    SET_ORDERS: 'order/setOrders',
    SET_META: 'order/setMeta',
    SET_CURRENT_ORDER: 'order/setCurrentOrder',
    CLEAR_CURRENT_ORDER: 'order/clearCurrentOrder',
} as const;

export const ORDER_QUERY_KEYS = {
    ALL_ORDERS: 'order/all',
    CURRENT_ORDER: 'order/current',
    CREATE_ORDER: 'order/create',
    UPDATE_ORDER: 'order/update',
    DELETE_ORDER: 'order/delete',
} as const;

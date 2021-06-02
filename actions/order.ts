import { Order, OrderReq, ShortOrder } from '../interfaces/data/order';

export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST' as const;
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS' as const;
export const ADD_ORDER_FAILURE = 'ADD_RESERVATION_FAILURE' as const;

export const LOAD_ORDERS_REQUEST = 'LOAD_ORDERS_REQUEST' as const;
export const LOAD_ORDERS_SUCCESS = 'LOAD_ORDERS_SUCCESS' as const;
export const LOAD_ORDERS_FAILURE = 'LOAD_ORDERS_FAILURE' as const;

export const LOAD_ORDER_INFO_REQUEST = 'LOAD_ORDER_INFO_REQUEST' as const;
export const LOAD_ORDER_INFO_SUCCESS = 'LOAD_ORDER_INFO_SUCCESS' as const;
export const LOAD_ORDER_INFO_FAILURE = 'LOAD_ORDER_INFO_FAILURE' as const;

export const ACCEPT_ORDER_REQUEST = 'ACCEPT_ORDER_REQUEST' as const;
export const ACCEPT_ORDER_SUCCESS = 'ACCEPT_ORDER_SUCCESS' as const;
export const ACCEPT_ORDER_FAILURE = 'ACCEPT_ORDER_FAILURE' as const;

export const REJECT_ORDER_REQUEST = 'REJECT_ORDER_REQUEST' as const;
export const REJECT_ORDER_SUCCESS = 'REJECT_ORDER_SUCCESS' as const;
export const REJECT_ORDER_FAILURE = 'REJECT_ORDER_FAILURE' as const;

export const addOrderRequest = (data: OrderReq) => ({
    type: ADD_ORDER_REQUEST,
    data,
});
export const addOrderSuccess = (order: Order) => ({
    type: ADD_ORDER_SUCCESS,
    order,
});
export const addOrderFailure = (error: string) => ({
    type: ADD_ORDER_FAILURE,
    error,
});

export const loadOrdersRequest = (userType: string, userId: string) => ({
    type: LOAD_ORDERS_REQUEST,
    userType,
    userId,
});

export const loadOrdersSuccess = (orders: ShortOrder[], userType: string) => ({
    type: LOAD_ORDERS_SUCCESS,
    orders,
    userType,
});

export const loadOrdersFailure = (error: string) => ({
    type: LOAD_ORDERS_FAILURE,
    error,
});

export const loadOrderInfoRequest = (orderId: string | string[]) => ({
    type: LOAD_ORDER_INFO_REQUEST,
    orderId,
});
export const loadOrderInfoSuccess = (order: Order) => ({
    type: LOAD_ORDER_INFO_SUCCESS,
    order,
});
export const loadOrderInfoFailure = (error: string) => ({
    type: LOAD_ORDER_INFO_FAILURE,
    error,
});

export const acceptOrderRequest = (orderId: string | string[], state: string) => ({
    type: ACCEPT_ORDER_REQUEST,
    orderId,
    state,
});
export const acceptOrderSuccess = (order: Order) => ({
    type: ACCEPT_ORDER_SUCCESS,
    order,
});
export const acceptOrderFailure = (error: string) => ({
    type: ACCEPT_ORDER_FAILURE,
    error,
});

export const rejectOrderRequest = (orderId: string | string[]) => ({
    type: REJECT_ORDER_REQUEST,
    orderId,
});
export const rejectOrderSuccess = (message: string) => ({
    type: REJECT_ORDER_SUCCESS,
    message,
});
export const rejectOrderFailure = (error: string) => ({
    type: REJECT_ORDER_FAILURE,
    error,
});

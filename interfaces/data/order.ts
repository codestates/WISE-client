export interface OrderReq {
    hospital: string;
    hours: number;
    pickup: string;
    content: string;
    message: string;
    serviceId: string;
    state: string;
    date: string;
    time: string;
    totalPayment: number;
}

export interface ShortOrder {
    _id: string;
    customer: { _id: string; name: string; mobile: string };
    assistant: { _id: string; name: string; mobile?: string };
    service: { _id: string; images: string[]; location: string };
    content: string;
    date: string;
    time: string;
    totalPayment: number;
    state: string;
    isReviewed: boolean;
}

export interface Order extends ShortOrder {
    pickup: string;
    hospital: string;
    message: string;
    hours: number;
}

export type OrderState = {
    customerProgressOrders: null | ShortOrder[];
    customerCompleteOrders: null | ShortOrder[];
    assistantApplyOrders: null | ShortOrder[];
    assistantAcceptOrders: null | ShortOrder[];
    assistantCompleteOrders: null | ShortOrder[];
    orderInfo: null | Order;
    acceptOrder: null | Order;
    addOrderLoading: boolean;
    addOrderDone: boolean;
    addOrderError: null | string;
    loadOrdersLoading: boolean;
    loadOrdersDone: boolean;
    loadOrdersError: null | string;
    loadOrderInfoLoading: boolean;
    loadOrderInfoDone: boolean;
    loadOrderInfoError: null | string;
    acceptOrderLoading: boolean;
    acceptOrderDone: boolean;
    acceptOrderError: null | string;
    rejectOrderLoading: boolean;
    rejectOrderDone: boolean;
    rejectOrderError: null | string;
};

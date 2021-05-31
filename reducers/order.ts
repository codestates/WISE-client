/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
    ADD_ORDER_REQUEST,
    ADD_ORDER_SUCCESS,
    ADD_ORDER_FAILURE,
    LOAD_ORDERS_FAILURE,
    LOAD_ORDERS_REQUEST,
    LOAD_ORDERS_SUCCESS,
    LOAD_ORDER_INFO_FAILURE,
    LOAD_ORDER_INFO_REQUEST,
    LOAD_ORDER_INFO_SUCCESS,
    ACCEPT_ORDER_FAILURE,
    ACCEPT_ORDER_REQUEST,
    ACCEPT_ORDER_SUCCESS,
    REJECT_ORDER_FAILURE,
    REJECT_ORDER_REQUEST,
    REJECT_ORDER_SUCCESS,
} from '../actions/order';
import { OrderAction } from '../interfaces/act/order';
import { OrderState } from '../interfaces/data/order';

/* ------- initial state ------ */
export const initialState: OrderState = {
    customerProgressOrders: null,
    customerCompleteOrders: null,
    assistantApplyOrders: null,
    assistantAcceptOrders: null,
    assistantCompleteOrders: null,
    orderInfo: null,
    acceptOrder: null,
    addOrderLoading: false,
    addOrderDone: false,
    addOrderError: null,
    loadOrdersLoading: false,
    loadOrdersDone: false,
    loadOrdersError: null,
    loadOrderInfoLoading: false,
    loadOrderInfoDone: false,
    loadOrderInfoError: null,
    acceptOrderLoading: false,
    acceptOrderDone: false,
    acceptOrderError: null,
    rejectOrderLoading: false,
    rejectOrderDone: false,
    rejectOrderError: null,
};

/* ------- reducer ------ */
const reducer = (state = initialState, action: OrderAction) =>
    produce(state, (draft: OrderState) => {
        switch (action.type) {
            case ADD_ORDER_REQUEST:
                draft.addOrderLoading = true;
                draft.addOrderDone = false;
                draft.addOrderError = null;
                break;
            case ADD_ORDER_SUCCESS:
                draft.addOrderLoading = false;
                draft.addOrderDone = true;
                draft.orderInfo = action.order;
                break;
            case ADD_ORDER_FAILURE:
                draft.addOrderLoading = false;
                draft.addOrderError = action.error;
                break;
            case LOAD_ORDERS_REQUEST:
                draft.loadOrdersLoading = true;
                draft.loadOrdersDone = false;
                draft.loadOrdersError = null;
                break;
            case LOAD_ORDERS_SUCCESS:
                draft.loadOrdersLoading = false;
                draft.loadOrdersDone = true;
                if (action.userType === 'customer') {
                    draft.customerProgressOrders = action.orders.filter((v) => v.state !== 'complete');
                    draft.customerCompleteOrders = action.orders.filter((v) => v.state === 'complete');
                } else {
                    draft.assistantApplyOrders = action.orders.filter((v) => v.state === 'apply');
                    draft.assistantAcceptOrders = action.orders.filter((v) => v.state === 'accept');
                    draft.assistantCompleteOrders = action.orders.filter((v) => v.state === 'complete');
                }
                break;
            case LOAD_ORDERS_FAILURE:
                draft.loadOrdersLoading = false;
                draft.loadOrdersError = action.error;
                break;
            case LOAD_ORDER_INFO_REQUEST:
                draft.loadOrderInfoLoading = true;
                draft.loadOrderInfoDone = false;
                draft.loadOrderInfoError = null;
                draft.orderInfo = null;
                break;
            case LOAD_ORDER_INFO_SUCCESS:
                draft.loadOrderInfoLoading = false;
                draft.loadOrderInfoDone = true;
                draft.orderInfo = action.order;
                break;
            case LOAD_ORDER_INFO_FAILURE:
                draft.loadOrderInfoError = action.error;
                break;
            case ACCEPT_ORDER_REQUEST:
                draft.acceptOrderLoading = true;
                draft.acceptOrderDone = false;
                draft.acceptOrderError = null;
                draft.acceptOrder = null;
                break;
            case ACCEPT_ORDER_SUCCESS:
                draft.acceptOrderLoading = false;
                draft.acceptOrderDone = true;
                draft.acceptOrder = action.order;
                break;
            case ACCEPT_ORDER_FAILURE:
                draft.acceptOrderLoading = false;
                draft.acceptOrderError = action.error;
                break;
            case REJECT_ORDER_REQUEST:
                draft.rejectOrderLoading = true;
                draft.rejectOrderDone = false;
                draft.rejectOrderError = null;
                break;
            case REJECT_ORDER_SUCCESS:
                draft.rejectOrderLoading = false;
                draft.rejectOrderDone = true;
                break;
            case REJECT_ORDER_FAILURE:
                draft.rejectOrderLoading = false;
                draft.rejectOrderError = action.error;
                break;
            default:
                break;
        }
    });

export default reducer;

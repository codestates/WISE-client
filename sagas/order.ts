/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosResponse } from 'axios';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
    acceptOrderFailure,
    acceptOrderRequest,
    acceptOrderSuccess,
    ACCEPT_ORDER_REQUEST,
    addOrderFailure,
    addOrderRequest,
    addOrderSuccess,
    ADD_ORDER_REQUEST,
    loadOrderInfoFailure,
    loadOrderInfoRequest,
    loadOrderInfoSuccess,
    loadOrdersFailure,
    loadOrdersRequest,
    loadOrdersSuccess,
    LOAD_ORDERS_REQUEST,
    LOAD_ORDER_INFO_REQUEST,
    rejectOrderFailure,
    rejectOrderRequest,
    rejectOrderSuccess,
    REJECT_ORDER_REQUEST,
} from '../actions/order';
import { Order, ShortOrder } from '../interfaces/data/order';

function addOrderAPI(
    accessToken: string,
    data: {
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
    },
) {
    return axios.post(
        `api/v1/orders`,
        {
            ...data,
        },
        {
            headers: {
                accessToken,
            },
        },
    );
}

function* addOrder(action: ReturnType<typeof addOrderRequest>) {
    try {
        const result: AxiosResponse<{ order: Order }> = yield call(addOrderAPI, action.accessToken, action.data);
        yield put(addOrderSuccess(result.data.order));
    } catch (err) {
        console.log(err);
        yield put(addOrderFailure(err.message));
    }
}

function loadOrdersAPI(accessToken: string, userType: string, userId: string) {
    // console.log('accessToken: ', accessToken);
    return axios.get(`/api/v1/orders?userId=${userId}&type=${userType}`, {
        headers: {
            accessToken,
        },
    });
}

function* loadOrders(action: ReturnType<typeof loadOrdersRequest>) {
    try {
        const result: AxiosResponse<{ orders: ShortOrder[] }> = yield call(
            loadOrdersAPI,
            action.accessToken,
            action.userType,
            action.userId,
        );
        console.log(result);
        yield put(loadOrdersSuccess(result.data.orders, action.userType));
    } catch (err) {
        console.log(err.message);
        yield put(loadOrdersFailure(err.message));
    }
}

function loadOrderInfoAPI(orderId: string | string[], accessToken: string) {
    return axios.get(`api/v1/orders/${orderId}`, {
        headers: {
            accessToken,
        },
    });
}

function* loadOrderInfo(action: ReturnType<typeof loadOrderInfoRequest>) {
    try {
        const result: AxiosResponse<{ order: Order }> = yield call(
            loadOrderInfoAPI,
            action.orderId,
            action.accessToken,
        );
        yield put(loadOrderInfoSuccess(result.data.order));
    } catch (err) {
        yield put(loadOrderInfoFailure(err.message));
    }
}

function acceptOrderAPI(orderId: string, accessToken: string, state: string) {
    return axios.patch(
        `api/v1/orders/${orderId}`,
        {
            state,
        },
        {
            headers: {
                accessToken,
            },
        },
    );
}

function* acceptOrder(action: ReturnType<typeof acceptOrderRequest>) {
    try {
        const result: AxiosResponse<{ order: Order }> = yield call(
            acceptOrderAPI,
            action.orderId,
            action.accessToken,
            action.state,
        );
        yield put(acceptOrderSuccess(result.data.order));
    } catch (err) {
        yield put(acceptOrderFailure(err.message));
    }
}

function rejectOrderAPI(orderId: string, accessToken: string) {
    return axios.delete(`api/v1/orders/${orderId}`, {
        headers: {
            accessToken,
        },
    });
}

function* rejectOrder(action: ReturnType<typeof rejectOrderRequest>) {
    try {
        const result: AxiosResponse<{ message: string }> = yield call(
            rejectOrderAPI,
            action.orderId,
            action.accessToken,
        );
        yield put(rejectOrderSuccess(result.data.message));
    } catch (err) {
        console.error(err);
        yield put(rejectOrderFailure(err.message));
    }
}

function* watchaddOrder() {
    yield takeLatest(ADD_ORDER_REQUEST, addOrder);
}

function* watchloadOrders() {
    yield takeLatest(LOAD_ORDERS_REQUEST, loadOrders);
}

function* watchloadOrderInfo() {
    yield takeLatest(LOAD_ORDER_INFO_REQUEST, loadOrderInfo);
}

function* watchacceptOrder() {
    yield takeLatest(ACCEPT_ORDER_REQUEST, acceptOrder);
}

function* watchrejectOrder() {
    yield takeLatest(REJECT_ORDER_REQUEST, rejectOrder);
}

export default function* orderSaga() {
    yield all([
        fork(watchaddOrder),
        fork(watchloadOrders),
        fork(watchloadOrderInfo),
        fork(watchacceptOrder),
        fork(watchrejectOrder),
    ]);
}

/* eslint-disable import/namespace */
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
import { getFirebaseToken } from '../firebase';
import { Order, ShortOrder } from '../interfaces/data/order';

function addOrderAPI(data: Order, accessToken: string) {
    return axios({
        method: 'POST',
        url: 'api/v1/orders',
        data,
        headers: { accessToken },
    });
}

function* addOrder(action: ReturnType<typeof addOrderRequest>) {
    try {
        const accessToken = yield call(getFirebaseToken);
        const result: AxiosResponse<{ order: Order }> = yield call(addOrderAPI, action.data, accessToken);
        yield put(addOrderSuccess(result.data.order));
    } catch (err) {
        console.log(err);
        yield put(addOrderFailure(err.message));
    }
}

function loadOrdersAPI(userType: string, userId: string, accessToken: string) {
    return axios({
        method: 'GET',
        url: `/api/v1/orders?userId=${userId}&type=${userType}`,
        headers: { accessToken },
    });
}

function* loadOrders(action: ReturnType<typeof loadOrdersRequest>) {
    try {
        const accessToken = yield call(getFirebaseToken);
        const result: AxiosResponse<{ orders: ShortOrder[] }> = yield call(
            loadOrdersAPI,
            action.userType,
            action.userId,
            accessToken,
        );
        yield put(loadOrdersSuccess(result.data.orders, action.userType));
    } catch (err) {
        yield put(loadOrdersFailure(err.message));
    }
}

function loadOrderInfoAPI(orderId: string | string[], accessToken: string) {
    return axios({
        method: 'GET',
        url: `api/v1/orders/${orderId}`,
        headers: { accessToken },
    });
}

function* loadOrderInfo(action: ReturnType<typeof loadOrderInfoRequest>) {
    try {
        const accessToken = yield call(getFirebaseToken);
        const result: AxiosResponse<{ order: Order }> = yield call(loadOrderInfoAPI, action.orderId, accessToken);
        yield put(loadOrderInfoSuccess(result.data.order));
    } catch (err) {
        yield put(loadOrderInfoFailure(err.message));
    }
}

function acceptOrderAPI(orderId: string, state: string, accessToken: string) {
    return axios({
        method: 'PATCH',
        url: `api/v1/orders/${orderId}`,
        data: { state },
        headers: { accessToken },
    });
}

function* acceptOrder(action: ReturnType<typeof acceptOrderRequest>) {
    try {
        const accessToken = yield call(getFirebaseToken);
        const result: AxiosResponse<{ order: Order }> = yield call(
            acceptOrderAPI,
            action.orderId,
            action.state,
            accessToken,
        );
        yield put(acceptOrderSuccess(result.data.order));
    } catch (err) {
        yield put(acceptOrderFailure(err.message));
    }
}

function rejectOrderAPI(orderId: string, accessToken: string) {
    return axios({
        method: 'DELETE',
        url: `api/v1/orders/${orderId}`,
        headers: { accessToken },
    });
}

function* rejectOrder(action: ReturnType<typeof rejectOrderRequest>) {
    try {
        const accessToken = yield call(getFirebaseToken);
        const result: AxiosResponse<{ message: string }> = yield call(rejectOrderAPI, action.orderId, accessToken);
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

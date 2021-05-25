/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosResponse } from 'axios';
import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import { EActionTypesService } from '../interfaces/act/service';
import * as data from '../interfaces/data/service';

import {
    GET_SERVICE_INFO_REQUEST,
    GET_SERVICE_INFO_SUCCESS,
    GET_SERVICE_INFO_FAILURE,
    LOAD_FIRST_REVIEWS_REQUEST,
    LOAD_FIRST_REVIEWS_SUCCESS,
    LOAD_FIRST_REVIEWS_FAILURE,
    LOAD_MORE_REVIEWS_REQUEST,
    LOAD_MORE_REVIEWS_SUCCESS,
    LOAD_MORE_REVIEWS_FAILURE,
    LOAD_ALL_SERVICES_REQUEST,
    LOAD_ALL_SERVICES_SUCCESS,
    LOAD_ALL_SERVICES_FAILURE,
    CREATE_RESERVATION_REQUEST,
    CREATE_RESERVATION_SUCCESS,
    CREATE_RESERVATION_FAILURE,
    GET_RESERVATION_INFO_REQUEST,
    GET_RESERVATION_INFO_SUCCESS,
    GET_RESERVATION_INFO_FAILURE,
    RESERVATION_ACCEPT_REQUEST,
    RESERVATION_ACCEPT_SUCCESS,
    RESERVATION_ACCEPT_FAILURE,
    RESERVATION_REJECT_REQUEST,
    RESERVATION_REJECT_SUCCESS,
    RESERVATION_REJECT_FAILURE,
    GET_ALL_RESERVATIONS_REQUEST,
    GET_ALL_RESERVATIONS_SUCCESS,
    GET_ALL_RESERVATIONS_FAILURE,
    CHECK_OUT_REQUEST,
    CHECK_OUT_SUCCESS,
    CHECK_OUT_FAILURE,
} from '../reducers/service';

function loadServicesAPI(accessToken: string) {
    return axios.get('api/v1/services', {
        headers: {
            accessToken,
        },
    });
}

function* loadServices(action: { accessToken: string }) {
    try {
        const result: AxiosResponse<{ data: { services: [data.ShortService] } }> = yield call(
            loadServicesAPI,
            action.accessToken,
        );
        yield put({
            type: LOAD_ALL_SERVICES_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_ALL_SERVICES_FAILURE,
            error: err.response.data,
        });
    }
}

function getSingleServiceAPI(serviceId: string) {
    return axios.get(`api/v1/services/${serviceId}`);
}

function* getSingleService(action: { serviceId: string }) {
    try {
        const result: AxiosResponse<{ data: { service: data.LongService } }> = yield call(
            getSingleServiceAPI,
            action.serviceId,
        );
        yield put({
            type: GET_SERVICE_INFO_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: GET_SERVICE_INFO_FAILURE,
            error: err.response.data,
        });
    }
}

function loadFirstReviewsAPI(serviceId: string) {
    return axios.get(`api/v1/reviews?serviceId=${serviceId}&page=${1}`);
}

function* loadFirstReviews(action: { serviceId: string }) {
    try {
        const result: AxiosResponse<{ data: {} }> = yield call(loadFirstReviewsAPI, action.serviceId);
        yield put({
            type: LOAD_FIRST_REVIEWS_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_FIRST_REVIEWS_FAILURE,
            error: err.response.data,
        });
    }
}

function loadMoreReviewsAPI(serviceId: string, page: number) {
    return axios.get(`api/v1/reviews?serviceId=${serviceId}&page=${page}`);
}

function* loadMoreReviews(action: { serviceId: string; page: number }) {
    try {
        const result: AxiosResponse<{ data: {} }> = yield call(loadMoreReviewsAPI, action.serviceId, action.page);
        yield put({
            type: LOAD_MORE_REVIEWS_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_MORE_REVIEWS_FAILURE,
            error: err.response.data,
        });
    }
}

function makeReservationAPI(accessToken: string, data: {}) {
    return axios.post(
        `api/v1/reservations`,
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

function* makeReservation(action: { accessToken: string; data: {} }) {
    try {
        const result: AxiosResponse<{ data: { order: data.Order } }> = yield call(
            makeReservationAPI,
            action.accessToken,
            action.data,
        );
        yield put({
            type: CREATE_RESERVATION_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: CREATE_RESERVATION_FAILURE,
            error: err.response.data,
        });
    }
}

function getAllReservationsAPI(userId: string, accessToken: string) {
    return axios.get(`api/v1/reservations/${userId}`, {
        headers: {
            accessToken,
        },
    });
}

function* getAllReservations(action: { userId: string; accessToken: string }) {
    try {
        const result: AxiosResponse<{ data: { orders: [data.Order] } }> = yield call(
            getAllReservationsAPI,
            action.userId,
            action.accessToken,
        );
        yield put({
            type: GET_ALL_RESERVATIONS_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: GET_ALL_RESERVATIONS_FAILURE,
            error: err.response.data,
        });
    }
}

function getReservationAPI(reservationId: string, accessToken: string) {
    return axios.get(`api/v1/reservations/${reservationId}`, {
        headers: {
            accessToken,
        },
    });
}

function* getReservation(action: { reservationId: string; accessToken: string }) {
    try {
        const result: AxiosResponse<{ data: { order: data.Order } }> = yield call(
            getReservationAPI,
            action.reservationId,
            action.accessToken,
        );
        yield put({
            type: GET_RESERVATION_INFO_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: GET_RESERVATION_INFO_FAILURE,
            error: err.response.data,
        });
    }
}

function reservationAcceptAPI(reservationId: string, accessToken: string, state: string) {
    return axios.patch(
        `api/v1/reservations/${reservationId}`,
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

function* reservationAccept(action: { reservationId: string; accessToken: string; state: string }) {
    try {
        const result: AxiosResponse<{ data: { order: data.Order } }> = yield call(
            reservationAcceptAPI,
            action.reservationId,
            action.accessToken,
            action.state,
        );
        yield put({
            type: RESERVATION_ACCEPT_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: RESERVATION_ACCEPT_FAILURE,
            error: err.response.data,
        });
    }
}

function reservationRejectAPI(reservationId: string, accessToken: string) {
    return axios.delete(`api/v1/reservations/${reservationId}`, {
        headers: {
            accessToken,
        },
    });
}

function* reservationReject(action: { reservationId: string; accessToken: string }) {
    try {
        const result: AxiosResponse<{ data: { message: string } }> = yield call(
            reservationRejectAPI,
            action.reservationId,
            action.accessToken,
        );
        yield put({
            type: RESERVATION_REJECT_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: RESERVATION_REJECT_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLoadServices() {
    yield takeLatest(LOAD_ALL_SERVICES_REQUEST, loadServices);
}

function* watchGetSingleService() {
    yield takeLatest(GET_SERVICE_INFO_REQUEST, getSingleService);
}

function* watchLoadFirstReviews() {
    yield takeLatest(LOAD_FIRST_REVIEWS_REQUEST, loadFirstReviews);
}

function* watchLoadMoreReviews() {
    yield takeLatest(LOAD_MORE_REVIEWS_REQUEST, loadMoreReviews);
}

function* watchMakeReservation() {
    yield takeLatest(CREATE_RESERVATION_REQUEST, makeReservation);
}

function* watchGetAllReservations() {
    yield takeLatest(GET_ALL_RESERVATIONS_REQUEST, getAllReservations);
}

function* watchGetReservation() {
    yield takeLatest(GET_RESERVATION_INFO_REQUEST, getReservation);
}

function* watchReservationAccept() {
    yield takeLatest(RESERVATION_ACCEPT_REQUEST, reservationAccept);
}

function* watchReservationReject() {
    yield takeLatest(RESERVATION_REJECT_REQUEST, reservationReject);
}

export default function* serviceSaga() {
    yield all([
        fork(watchLoadServices),
        fork(watchGetSingleService),
        fork(watchLoadFirstReviews),
        fork(watchLoadMoreReviews),
        fork(watchMakeReservation),
        fork(watchGetAllReservations),
        fork(watchGetReservation),
        fork(watchReservationAccept),
        fork(watchReservationReject),
    ]);
}

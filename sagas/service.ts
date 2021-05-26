/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosResponse } from 'axios';
import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import * as data from '../interfaces/data/service';

import {
    GET_SERVICE_INFO_REQUEST,
    LOAD_FIRST_REVIEWS_REQUEST,
    LOAD_MORE_REVIEWS_REQUEST,
    CREATE_RESERVATION_REQUEST,
    GET_RESERVATION_INFO_REQUEST,
    RESERVATION_ACCEPT_REQUEST,
    RESERVATION_REJECT_REQUEST,
    GET_ALL_RESERVATIONS_REQUEST,
    CHECK_OUT_REQUEST,
    LOAD_POPULAR_SERVICE_REQUEST,
    LOAD_SEARCH_SERVICE_REQUEST,
    LOAD_TOTAL_SERVICE_REQUEST,
} from '../interfaces/act/services';
import {
    loadPopularServicesSuccess,
    loadPopularServicesFailure,
    loadTotalServicesSuccess,
    loadTotalServicesFailure,
    loadSearchServicesSuccess,
    loadSearchServicesFailure,
    checkoutFailure,
    checkoutSuccess,
    createReservationFailure,
    createReservationSuccess,
    getAllReservationsFailure,
    getAllReservationsSuccess,
    getReservationInfoFailure,
    getReservationInfoSuccess,
    getServiceInfoFailure,
    getServiceInfoSuccess,
    loadFirstReviewFailure,
    loadFirstReviewSuccess,
    loadMoreReviewsFailure,
    loadMoreReviewsSuccess,
    reservationAcceptFailure,
    reservationAcceptSuccess,
    reservationRejectFailure,
    reservationRejectSuccess,
    loadMoreReviewsRequest,
    checkoutRequest,
    createReservationRequest,
    getAllReservationsRequest,
    getReservationInfoRequest,
    getServiceInfoRequest,
    loadFirstReviewRequest,
    reservationAcceptRequest,
    reservationRejectRequest,
    loadTotalServicesRequest,
    loadSearchServicesRequest,
} from '../actions/service';

function loadPopularServiceAPI() {
    return axios.get('/api/v1/services/popularity');
}

function* loadPopularService() {
    try {
        const result: AxiosResponse<{ popularServices: data.ShortService[] }> = yield call(loadPopularServiceAPI);
        yield put(loadPopularServicesSuccess(result.data.popularServices));
    } catch (err) {
        yield put(loadPopularServicesFailure(err.message));
    }
}

function loadTotalServiceAPI(page: number) {
    return axios.get(`/api/v1/services/all?page=${page}`);
}

function* loadTotalService(action: ReturnType<typeof loadTotalServicesRequest>) {
    try {
        const result: AxiosResponse<{ services: data.ShortService[]; totalServices: number }> = yield call(
            loadTotalServiceAPI,
            action.page,
        );
        yield put(loadTotalServicesSuccess(result.data.services, result.data.totalServices - 8));
    } catch (err) {
        yield put(loadTotalServicesFailure(err.message));
    }
}

function loadSearchServiceAPI(query: data.Query) {
    const { location, date, time, page } = query;
    return axios.get(`/api/v1/services/?location=${location}&date=${date}&time=${time}&page=${page}`);
}

function* loadSearchService(action: ReturnType<typeof loadSearchServicesRequest>) {
    try {
        const result: AxiosResponse<{ services: data.ShortService[]; totalServices: number }> = yield call(
            loadSearchServiceAPI,
            action.query,
        );
        yield put(loadSearchServicesSuccess(result.data.services, result.data.totalServices, action.query));
    } catch (err) {
        yield put(loadSearchServicesFailure(err.message));
    }
}

function getSingleServiceAPI(serviceId: string) {
    return axios.get(`api/v1/services/${serviceId}`);
}

function* getSingleService(action: ReturnType<typeof getServiceInfoRequest>) {
    try {
        const result: AxiosResponse<{ service: data.LongService }> = yield call(getSingleServiceAPI, action.serviceId);
        yield put(getServiceInfoSuccess(result.data.service));
    } catch (err) {
        yield put(getServiceInfoFailure(err.message));
    }
}

function loadFirstReviewsAPI(serviceId: string) {
    return axios.get(`api/v1/reviews?serviceId=${serviceId}&page=${1}`);
}

function* loadFirstReviews(action: ReturnType<typeof loadFirstReviewRequest>) {
    try {
        const result: AxiosResponse<{ reviews: data.Review[] }> = yield call(loadFirstReviewsAPI, action.serviceId);
        yield put(loadFirstReviewSuccess(result.data.reviews));
    } catch (err) {
        yield put(loadFirstReviewFailure(err.message));
    }
}

function loadMoreReviewsAPI(serviceId: string, page: number) {
    return axios.get(`api/v1/reviews?serviceId=${serviceId}&page=${page}`);
}

function* loadMoreReviews(action: ReturnType<typeof loadMoreReviewsRequest>) {
    try {
        const result: AxiosResponse<{ reviews: data.Review[] }> = yield call(
            loadMoreReviewsAPI,
            action.serviceId,
            action.page,
        );
        yield put(loadMoreReviewsSuccess(result.data.reviews));
    } catch (err) {
        yield put(loadMoreReviewsFailure(err.message));
    }
}

function makeReservationAPI(accessToken: string, data: data.Order) {
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

function* makeReservation(action: ReturnType<typeof createReservationRequest>) {
    try {
        const result: AxiosResponse<{ order: data.Order }> = yield call(
            makeReservationAPI,
            action.accessToken,
            action.data,
        );
        yield put(createReservationSuccess(result.data.order));
    } catch (err) {
        yield put(createReservationFailure(err.message));
    }
}

function getAllReservationsAPI(userId: string, accessToken: string) {
    return axios.get(`api/v1/orders/${userId}`, {
        headers: {
            accessToken,
        },
    });
}

function* getAllReservations(action: ReturnType<typeof getAllReservationsRequest>) {
    try {
        const result: AxiosResponse<{ orders: [data.Order] }> = yield call(
            getAllReservationsAPI,
            action.userId,
            action.accessToken,
        );
        yield put(getAllReservationsSuccess(result.data.orders));
    } catch (err) {
        yield put(getAllReservationsFailure(err.message));
    }
}

function getReservationAPI(orderId: string, accessToken: string) {
    return axios.get(`api/v1/orders/${orderId}`, {
        headers: {
            accessToken,
        },
    });
}

function* getReservation(action: ReturnType<typeof getReservationInfoRequest>) {
    try {
        const result: AxiosResponse<{ order: data.Order }> = yield call(
            getReservationAPI,
            action.orderId,
            action.accessToken,
        );
        yield put(getReservationInfoSuccess(result.data.order));
    } catch (err) {
        yield put(getReservationInfoFailure(err.message));
    }
}

function reservationAcceptAPI(orderId: string, accessToken: string, state: string) {
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

function* reservationAccept(action: ReturnType<typeof reservationAcceptRequest>) {
    try {
        const result: AxiosResponse<{ order: data.Order }> = yield call(
            reservationAcceptAPI,
            action.orderId,
            action.accessToken,
            action.state,
        );
        yield put(reservationAcceptSuccess(result.data.order));
    } catch (err) {
        yield put(reservationAcceptFailure(err.message));
    }
}

function reservationRejectAPI(orderId: string, accessToken: string) {
    return axios.delete(`api/v1/orders/${orderId}`, {
        headers: {
            accessToken,
        },
    });
}

function* reservationReject(action: ReturnType<typeof reservationRejectRequest>) {
    try {
        const result: AxiosResponse<{ message: string }> = yield call(
            reservationRejectAPI,
            action.orderId,
            action.accessToken,
        );
        yield put(reservationRejectSuccess(result.data.message));
    } catch (err) {
        console.error(err);
        yield put(reservationRejectFailure(err.message));
    }
}

function checkoutAPI(orderId: string, impUid: string | string[], accessToken: string) {
    return axios.post(
        `api/v1/payments/${orderId}`,
        {
            impUid,
        },
        {
            headers: {
                accessToken,
            },
        },
    );
}

function* checkout(action: ReturnType<typeof checkoutRequest>) {
    try {
        const result: AxiosResponse<{ status: string; message: string }> = yield call(
            checkoutAPI,
            action.orderId,
            action.impUid,
            action.accessToken,
        );
        yield put(checkoutSuccess(result.data.status, result.data.message));
    } catch (err) {
        yield put(checkoutFailure(err.message));
    }
}

function* watchLoadTotalService() {
    yield throttle(5000, LOAD_TOTAL_SERVICE_REQUEST, loadTotalService);
}

function* watchLoadPopularService() {
    yield takeLatest(LOAD_POPULAR_SERVICE_REQUEST, loadPopularService);
}

function* watchLoadSearchService() {
    yield throttle(5000, LOAD_SEARCH_SERVICE_REQUEST, loadSearchService);
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

function* watchCheckout() {
    yield takeLatest(CHECK_OUT_REQUEST, checkout);
}

export default function* serviceSaga() {
    yield all([
        fork(watchLoadPopularService),
        fork(watchLoadTotalService),
        fork(watchLoadSearchService),
        fork(watchGetSingleService),
        fork(watchLoadFirstReviews),
        fork(watchLoadMoreReviews),
        fork(watchMakeReservation),
        fork(watchGetAllReservations),
        fork(watchGetReservation),
        fork(watchReservationAccept),
        fork(watchReservationReject),
        fork(watchCheckout),
    ]);
}

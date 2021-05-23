import axios from 'axios';
import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';

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
    CHECK_OUT_REQUEST,
    CHECK_OUT_SUCCESS,
    CHECK_OUT_FAILURE,
} from '../reducers/service';

function loadServicesAPI(accessToken) {
    return axios.get('api/v1/services', {
        headers: {
            accessToken,
        },
    });
}

function* loadServices(action) {
    try {
        const result = yield call(loadServicesAPI, action.accessToken);
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

function getSingleServiceAPI(serviceId) {
    return axios.get(`api/v1/services/${serviceId}`);
}

function* getSingleService(action) {
    try {
        const result = yield call(getSingleServiceAPI, action.serviceId);
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

function loadFirstReviewsAPI(serviceId) {
    return axios.get(`api/v1/reviews?serviceId=${serviceId}&page=${1}`);
}

function* loadFirstReviews(action) {
    try {
        const result = yield call(loadFirstReviewsAPI, action.serviceId);
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

function loadMoreReviewsAPI(serviceId, page) {
    return axios.get(`api/v1/reviews?serviceId=${serviceId}&page=${page}`);
}

function* loadMoreReviews(action) {
    try {
        const result = yield call(loadMoreReviewsAPI, action.serviceId, action.page);
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

function makeReservationAPI(accessToken, data) {
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

function* makeReservation(action) {
    try {
        const result = yield call(makeReservationAPI, action.accessToken, action.data);
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

export default function* postSaga() {
    yield all([
        fork(watchLoadServices),
        fork(watchGetSingleService),
        fork(watchLoadFirstReviews),
        fork(watchLoadMoreReviews),
        fork(watchMakeReservation),
    ]);
}

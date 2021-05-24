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
    LOAD_POPULAR_SERVICE_SUCCESS,
    LOAD_POPULAR_SERVICE_FAILURE,
    LOAD_POPULAR_SERVICE_REQUEST,
    LOAD_TOTAL_SERVICE_SUCCESS,
    LOAD_TOTAL_SERVICE_FAILURE,
    LOAD_TOTAL_SERVICE_REQUEST,
    LOAD_SEARCH_SERVICE_SUCCESS,
    LOAD_SEARCH_SERVICE_FAILURE,
    LOAD_SEARCH_SERVICE_REQUEST,
} from '../reducers/service';

function loadPopularServiceAPI() {
    return axios.get('/api/v1/services/popularity');
}

function* loadPopularService() {
    try {
        const result = yield call(loadPopularServiceAPI);
        console.log(result.data);
        yield put({
            type: LOAD_POPULAR_SERVICE_SUCCESS,
            popularService: result.data.popularService,
        });
    } catch (err) {
        yield put({
            type: LOAD_POPULAR_SERVICE_FAILURE,
            error: err.message,
        });
    }
}

function* watchLoadPopularService() {
    yield takeLatest(LOAD_POPULAR_SERVICE_REQUEST, loadPopularService);
}

function loadTotalServiceAPI(page) {
    return axios.get(`/api/v1/services/all?page=${page}`);
}

function* loadTotalService(action) {
    try {
        const result = yield call(loadTotalServiceAPI, action.page);
        console.log('action.page :', action.page);
        console.log(result.data);
        yield put({
            type: LOAD_TOTAL_SERVICE_SUCCESS,
            totalService: result.data.service,
            totalServiceCount: result.data.totalServices - 8,
        });
    } catch (err) {
        yield put({
            type: LOAD_TOTAL_SERVICE_FAILURE,
            error: err.message,
        });
    }
}

function* watchLoadTotalService() {
    yield throttle(5000, LOAD_TOTAL_SERVICE_REQUEST, loadTotalService);
}

function loadSearchServiceAPI(query) {
    console.log('query : ', query);
    const { location, date, time, page } = query;
    return axios.get(`/api/v1/services/?location=${location}&date=${date}&time=${time}&page=${page}`);
}

function* loadSearchService(action) {
    try {
        const result = yield call(loadSearchServiceAPI, action.query);
        console.log(result.data);
        yield put({
            type: LOAD_SEARCH_SERVICE_SUCCESS,
            searchService: result.data.service,
            searchServiceCount: result.data.totalServices,
            searchQuery: action.query,
        });
    } catch (err) {
        yield put({
            type: LOAD_SEARCH_SERVICE_FAILURE,
            error: err.message,
        });
    }
}

function* watchLoadSearchService() {
    yield throttle(5000, LOAD_SEARCH_SERVICE_REQUEST, loadSearchService);
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

function getAllReservationsAPI(userId, accessToken) {
    return axios.get(`api/v1/reservations/${userId}`, {
        headers: {
            accessToken,
        },
    });
}

function* getAllReservations(action) {
    try {
        const result = yield call(getAllReservationsAPI, action.userId, action.accessToken);
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

function getReservationAPI(reservationId, accessToken) {
    return axios.get(`api/v1/reservations/${reservationId}`, {
        headers: {
            accessToken,
        },
    });
}

function* getReservation(action) {
    try {
        const result = yield call(getReservationAPI, action.reservationId, action.accessToken);
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

function reservationAcceptAPI(reservationId, accessToken, state) {
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

function* reservationAccept(action) {
    try {
        const result = yield call(reservationAcceptAPI, action.reservationId, action.accessToken, action.state);
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

function reservationRejectAPI(reservationId, accessToken) {
    return axios.delete(`api/v1/reservations/${reservationId}`, {
        headers: {
            accessToken,
        },
    });
}

function* reservationReject(action) {
    try {
        const result = yield call(reservationRejectAPI, action.reservationId, action.accessToken, action.state);
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

export default function* postSaga() {
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
    ]);
}

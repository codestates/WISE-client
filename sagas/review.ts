/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosResponse } from 'axios';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import {
    loadFirstReviewFailure,
    loadFirstReviewSuccess,
    loadMoreReviewsFailure,
    loadMoreReviewsSuccess,
    loadMoreReviewsRequest,
    loadFirstReviewRequest,
    LOAD_FIRST_REVIEWS_REQUEST,
    LOAD_MORE_REVIEWS_REQUEST,
} from '../actions/review';
import { Review } from '../interfaces/data/review';

function loadFirstReviewsAPI(serviceId: string) {
    return axios.get(`api/v1/reviews?serviceId=${serviceId}&page=${1}`);
}

function* loadFirstReviews(action: ReturnType<typeof loadFirstReviewRequest>) {
    try {
        const result: AxiosResponse<{ reviews: Review[] }> = yield call(loadFirstReviewsAPI, action.serviceId);
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
        const result: AxiosResponse<{ reviews: Review[] }> = yield call(
            loadMoreReviewsAPI,
            action.serviceId,
            action.page,
        );
        yield put(loadMoreReviewsSuccess(result.data.reviews));
    } catch (err) {
        yield put(loadMoreReviewsFailure(err.message));
    }
}

function* watchLoadFirstReviews() {
    yield takeLatest(LOAD_FIRST_REVIEWS_REQUEST, loadFirstReviews);
}

function* watchLoadMoreReviews() {
    yield takeLatest(LOAD_MORE_REVIEWS_REQUEST, loadMoreReviews);
}

export default function* reviewSaga() {
    yield all([fork(watchLoadFirstReviews), fork(watchLoadMoreReviews)]);
}

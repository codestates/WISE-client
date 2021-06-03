/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosResponse } from 'axios';
import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import {
    addServiceFailure,
    addServiceRequest,
    addServiceSuccess,
    ADD_SERVICE_REQUEST,
    changeServiceFailure,
    changeServiceRequest,
    changeServiceSuccess,
    CHANGE_SERVICE_REQUEST,
    loadPopularServicesFailure,
    loadPopularServicesSuccess,
    loadSearchServicesFailure,
    loadSearchServicesRequest,
    loadSearchServicesSuccess,
    loadServiceFailure,
    loadServiceInfoFailure,
    loadServiceInfoRequest,
    loadServiceInfoSuccess,
    loadServiceRequest,
    loadServiceSuccess,
    loadTotalServicesFailure,
    loadTotalServicesRequest,
    loadTotalServicesSuccess,
    LOAD_POPULAR_SERVICES_REQUEST,
    LOAD_SEARCH_SERVICES_REQUEST,
    LOAD_SERVICE_INFO_REQUEST,
    LOAD_SERVICE_REQUEST,
    LOAD_TOTAL_SERVICES_REQUEST,
    removeServiceFailure,
    removeServiceRequest,
    removeServiceSuccess,
    REMOVE_SERVICE_REQUEST,
} from '../actions/service';
import { getFirebaseToken } from '../firebase';
import { Query, Service } from '../interfaces/data/service';

function addServiceAPI(data: FormData, accessToken: string) {
    return axios({
        method: 'POST',
        url: '/api/v1/services',
        data,
        headers: { accessToken },
    });
    // headers: {
    //     accessToken,
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
    // },
}

function* addService(action: ReturnType<typeof addServiceRequest>) {
    try {
        const accessToken: string = yield call(getFirebaseToken);
        const result: AxiosResponse<{ service: Service }> = yield call(addServiceAPI, action.data, accessToken);
        yield put(addServiceSuccess(result.data.service));
    } catch (err) {
        yield put(addServiceFailure(err.message));
    }
}

function loadServiceAPI(serviceId: string) {
    return axios({
        method: 'GET',
        url: `api/v1/services/${serviceId}`,
    });
}

function* loadService(action: ReturnType<typeof loadServiceRequest>) {
    try {
        const result: AxiosResponse<{ service: Service }> = yield call(loadServiceAPI, action.serviceId);
        yield put(loadServiceSuccess(result.data.service));
    } catch (err) {
        yield put(loadServiceFailure(err.message));
    }
}

function changeServiceAPI(serviceId: string, data: FormData, accessToken: string) {
    return axios({
        method: 'PATCH',
        url: `api/v1/services/${serviceId}`,
        data,
        headers: { accessToken },
    });
    // headers: {
    //     accessToken,
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
    // },
}

function* changeService(action: ReturnType<typeof changeServiceRequest>) {
    try {
        const accessToken: string = yield call(getFirebaseToken);
        const result: AxiosResponse<{ service: Service }> = yield call(
            changeServiceAPI,
            action.serviceId,
            action.data,
            accessToken,
        );
        yield put(changeServiceSuccess(result.data.service));
    } catch (err) {
        yield put(changeServiceFailure(err.message));
    }
}

function removeServiceAPI(serviceId: string) {
    return axios({
        method: 'DELETE',
        url: `api/v1/services/${serviceId}`,
    });
}

function* removeService(action: ReturnType<typeof removeServiceRequest>) {
    try {
        yield call(removeServiceAPI, action.serviceId);
        yield put(removeServiceSuccess());
    } catch (err) {
        yield put(removeServiceFailure(err.message));
    }
}

function loadPopularServicesAPI() {
    return axios({
        method: 'GET',
        url: '/api/v1/services/popularity',
    });
}

function* loadPopularServices() {
    try {
        const result: AxiosResponse<{ popularServices: Service[] }> = yield call(loadPopularServicesAPI);
        yield put(loadPopularServicesSuccess(result.data.popularServices));
    } catch (err) {
        yield put(loadPopularServicesFailure(err.message));
    }
}

function loadTotalServicesAPI(page: number) {
    return axios({
        method: 'GET',
        url: `/api/v1/services/all?page=${page}`,
    });
}

function* loadTotalServices(action: ReturnType<typeof loadTotalServicesRequest>) {
    try {
        const result: AxiosResponse<{ services: Service[]; totalServices: number }> = yield call(
            loadTotalServicesAPI,
            action.page,
        );
        yield put(loadTotalServicesSuccess(result.data.services, result.data.totalServices - 8));
    } catch (err) {
        yield put(loadTotalServicesFailure(err.message));
    }
}

function loadSearchServicesAPI(query: Query) {
    const { location, date, time, page } = query;
    return axios({
        method: 'GET',
        url: `/api/v1/services/?location=${location}&date=${date}&time=${time}&page=${page}`,
    });
}

function* loadSearchServices(action: ReturnType<typeof loadSearchServicesRequest>) {
    try {
        const result: AxiosResponse<{ services: Service[]; totalServices: number }> = yield call(
            loadSearchServicesAPI,
            action.query,
        );
        yield put(loadSearchServicesSuccess(result.data.services, result.data.totalServices, action.query));
    } catch (err) {
        yield put(loadSearchServicesFailure(err.message));
    }
}

function loadServiceInfoAPI(serviceId: string | string[]) {
    return axios({
        method: 'GET',
        url: `api/v1/services/${serviceId}`,
    });
}

function* loadServiceInfo(action: ReturnType<typeof loadServiceInfoRequest>) {
    try {
        const result: AxiosResponse<{ service: Service }> = yield call(loadServiceInfoAPI, action.serviceId);
        yield put(loadServiceInfoSuccess(result.data.service));
    } catch (err) {
        yield put(loadServiceInfoFailure(err.message));
    }
}

function* watchAddService() {
    yield takeLatest(ADD_SERVICE_REQUEST, addService);
}

function* watchLoadService() {
    yield takeLatest(LOAD_SERVICE_REQUEST, loadService);
}

function* watchChangeService() {
    yield takeLatest(CHANGE_SERVICE_REQUEST, changeService);
}

function* watchRemoveService() {
    yield takeLatest(REMOVE_SERVICE_REQUEST, removeService);
}

function* watchLoadTotalServices() {
    yield throttle(5000, LOAD_TOTAL_SERVICES_REQUEST, loadTotalServices);
}

function* watchLoadPopularServices() {
    yield takeLatest(LOAD_POPULAR_SERVICES_REQUEST, loadPopularServices);
}

function* watchLoadSearchServices() {
    yield throttle(5000, LOAD_SEARCH_SERVICES_REQUEST, loadSearchServices);
}

function* watchLoadServiceInfo() {
    yield takeLatest(LOAD_SERVICE_INFO_REQUEST, loadServiceInfo);
}

export default function* serviceSaga() {
    yield all([
        fork(watchAddService),
        fork(watchLoadService),
        fork(watchChangeService),
        fork(watchRemoveService),
        fork(watchLoadPopularServices),
        fork(watchLoadTotalServices),
        fork(watchLoadSearchServices),
        fork(watchLoadServiceInfo),
    ]);
}

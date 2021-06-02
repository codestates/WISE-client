/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosResponse } from 'axios';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
    addNotificationRequest,
    addNotificationSuccess,
    addNotificationFailure,
    ADD_NOTIFICATION_REQUEST,
    loadNotificationsFailure,
    loadNotificationsRequest,
    loadNotificationsSuccess,
    LOAD_NOTIFICATIONS_REQUEST,
    checkNotificationRequest,
    CHECK_NOTIFICATION_REQUEST,
} from '../actions/notifications';

function loadNotificationsAPI(userId: string | string[], accessToken: string) {
    return axios.get(`api/v1/notifications?userId=${userId}`, {
        headers: {
            accessToken,
        },
    });
}

function* loadNotifications(action: ReturnType<typeof loadNotificationsRequest>) {
    try {
        const result: AxiosResponse<{ notifications: Notification[] }> = yield call(
            loadNotificationsAPI,
            action.userId,
            action.accessToken,
        );
        yield put(loadNotificationsSuccess(result.data.notifications));
    } catch (err) {
        yield put(loadNotificationsFailure(err.message));
    }
}

function* watchloadNotifications() {
    yield takeLatest(LOAD_NOTIFICATIONS_REQUEST, loadNotifications);
}

function addNotificationAPI(
    data: {
        recipient: string | string[];
        subject: string;
        clientUrl: string;
        content: string;
    },
    accessToken: string,
) {
    return axios.post(
        `api/v1/notifications`,
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
function* addNotification(action: ReturnType<typeof addNotificationRequest>) {
    try {
        const result: AxiosResponse<{ notifications: Notification[] }> = yield call(
            addNotificationAPI,
            action.data,
            action.accessToken,
        );
        yield put(addNotificationSuccess(result.data.notifications));
    } catch (err) {
        yield put(addNotificationFailure(err.message));
    }
}

function* watchaddNotification() {
    yield takeLatest(ADD_NOTIFICATION_REQUEST, addNotification);
}

function checkNotificationAPI(notificationId: string, accessToken: string) {
    console.log(notificationId, accessToken);
    return axios.patch(`api/v1/notifications/${notificationId}`, {
        headers: {
            accessToken,
        },
    });
}
function* checkNotification(action: ReturnType<typeof checkNotificationRequest>) {
    try {
        const result: AxiosResponse<{ notifications: Notification[] }> = yield call(
            checkNotificationAPI,
            action.notificationId,
            action.accessToken,
        );
        yield put(addNotificationSuccess(result.data.notifications));
    } catch (err) {
        yield put(addNotificationFailure(err.message));
    }
}

function* watchcheckNotification() {
    yield takeLatest(CHECK_NOTIFICATION_REQUEST, checkNotification);
}

export default function* notificationsSaga() {
    yield all([fork(watchloadNotifications), fork(watchaddNotification), fork(watchcheckNotification)]);
}

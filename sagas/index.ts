import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user';
import serviceSaga from './service';
import reviewSaga from './review';
import orderSaga from './order';
import paymentSaga from './payment';
import notificationsSaga from './notifications';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(serviceSaga),
        fork(reviewSaga),
        fork(orderSaga),
        fork(paymentSaga),
        fork(notificationsSaga),
    ]);
}

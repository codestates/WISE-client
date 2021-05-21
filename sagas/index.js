import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user';
import serviceSaga from './service';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([fork(userSaga)]);
    yield all([fork(serviceSaga)]);
}

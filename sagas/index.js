import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

// import userSaga from './user';
import serviceSaga from './service';

axios.defaults.baseURL = process.env.backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([fork(serviceSaga)]);
}

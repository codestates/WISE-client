/* eslint-disable import/no-extraneous-dependencies */
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import firebase from 'firebase/app';
import { auth, googleAuthProvider, facebookAuthProvider } from '../firebase';
import {
    LOAD_MY_INFO_REQUEST,
    LOAD_MY_INFO_SUCCESS,
    LOAD_MY_INFO_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_FAILURE,
    LOG_IN_SUCCESS,
    LOG_OUT_REQUEST,
    LOG_OUT_FAILURE,
    LOG_OUT_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    EMAIL_CHECK_REQUEST,
    EMAIL_CHECK_SUCCESS,
    EMAIL_CHECK_FAILURE,
} from '../reducers/user';

function loadMyInfoAPI() {
    return axios.get('/api/v1/users/60a621239ee7342a41f95475');
}

function* loadMyInfo() {
    try {
        const result = yield call(loadMyInfoAPI);
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            payload: result.data.user,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

async function loginToken({ email, password, signinMethod }) {
    let result = '';
    if (signinMethod === 'password') {
        result = await auth.signInWithEmailAndPassword(email, password);
    } else if (signinMethod === 'google') {
        googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
        result = await auth.signInWithPopup(googleAuthProvider);
    } else if (signinMethod === 'facebook') {
        facebookAuthProvider.setCustomParameters({ display: 'popup' });
        result = await auth.signInWithPopup(facebookAuthProvider);
    }
    const accessToken = await result.user.getIdToken();
    return accessToken;
}

function logInAPI(accessToken, { signinMethod }) {
    return axios.post(
        '/api/v1/signin',
        { signinMethod },
        {
            headers: {
                accessToken,
            },
        },
    );
}

function* logIn(action) {
    try {
        const accessToken = yield call(loginToken, action.data);
        const result = yield call(logInAPI, accessToken, action.data);
        yield put({
            type: LOG_IN_SUCCESS,
            payload: result.data.user,
            token: accessToken,
        });
    } catch (err) {
        let errorMessage = '';
        if (err.message === 'The password is invalid or the user does not have a password.') {
            errorMessage = '비밀번호가 일치하지 않습니다.';
        } else if (
            err.message === 'There is no user record corresponding to this identifier. The user may have been deleted.'
        ) {
            errorMessage = '존재하지 않는 이메일입니다.';
        } else if (
            err.message ===
            'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
        ) {
            errorMessage = '로그인에 연속으로 실패하였습니다. 잠시후 다시 시도해주세요.';
        } else {
            errorMessage = '동일한 이메일의 계정이 이미 존재합니다.';
        }
        yield put({
            type: LOG_IN_FAILURE,
            error: errorMessage,
        });
    }
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* logOut() {
    try {
        firebase.auth().signOut();
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

async function signupToken({ email, password }) {
    await auth.signInWithEmailLink(email, location.href);
    const user = auth.currentUser;
    await user.updatePassword(password);
    const accessToken = await user.getIdToken();
    return accessToken;
}

async function emailCheckAPI(email) {
    await axios.post('/api/v1/email-validation', {
        email,
    });
    const REDIRECT_URL = 'http://localhost:3000/user/signup';
    const config = {
        url: REDIRECT_URL,
        handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    localStorage.setItem('emailForSignup', email);
}

function* emailCheck(action) {
    try {
        yield call(emailCheckAPI, action.email);
        yield put({
            type: EMAIL_CHECK_SUCCESS,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: EMAIL_CHECK_FAILURE,
            error: '이미 가입된 이메일 입니다.',
        });
    }
}

function* watchEmailCheck() {
    yield takeLatest(EMAIL_CHECK_REQUEST, emailCheck);
}

function signUpAPI(accessToken, { email, name, mobile, signinMethod }) {
    return axios.post(
        '/api/v1/signup',
        { email, name, mobile, signinMethod },
        {
            headers: {
                accessToken,
            },
        },
    );
}

function* signUp(action) {
    try {
        const accessToken = yield call(signupToken, action.data);
        const result = yield call(signUpAPI, accessToken, action.data);
        console.log(result);
        yield put({
            type: SIGN_UP_SUCCESS,
            token: accessToken,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
    yield all([fork(watchLoadMyInfo), fork(watchEmailCheck), fork(watchLogIn), fork(watchLogOut), fork(watchSignUp)]);
}

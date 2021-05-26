/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import firebase from 'firebase/app';
import { auth, googleAuthProvider, facebookAuthProvider } from '../firebase';

import { User } from '../interfaces/data/user';
import {
    EMAIL_CHECK_REQUEST,
    LOAD_MY_INFO_REQUEST,
    LOG_IN_REQUEST,
    LOG_OUT_REQUEST,
    REGISTER_SERVICE_REQUEST,
    SIGN_UP_REQUEST,
} from '../interfaces/act/user';
import {
    loadMyInfoSuccess,
    loadMyInfoFailure,
    loginSuccess,
    loginFailure,
    logoutSuccess,
    logoutFailure,
    emailCheckSuccess,
    emailCheckFailure,
    signupSuccess,
    signupFailure,
    registerServiceSuccess,
    registerServiceFailure,
} from '../actions/user';

axios.defaults.withCredentials = true;

function loadMyInfoAPI(userId: string) {
    return axios.get(`/api/v1/users/${userId}`);
}

type IUser = {
    user: User;
};

function* loadMyInfo() {
    try {
        const userId = localStorage.getItem('userId') as string;
        const accessToken = localStorage.getItem('accessToken') as string;
        const result: AxiosResponse<IUser> = yield call(loadMyInfoAPI, userId);
        yield put(loadMyInfoSuccess(result.data.user, accessToken));
    } catch (err) {
        yield put(loadMyInfoFailure(err.message));
    }
}

function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

type LoginData = {
    email?: string;
    password?: string;
    signinMethod: string;
};

async function loginToken({ email, password, signinMethod }: LoginData) {
    let result = null;
    if (signinMethod === 'password') {
        result = await auth.signInWithEmailAndPassword(email, password);
    } else if (signinMethod === 'google') {
        googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
        result = await auth.signInWithPopup(googleAuthProvider);
    } else if (signinMethod === 'facebook') {
        facebookAuthProvider.setCustomParameters({ display: 'popup' });
        result = await auth.signInWithPopup(facebookAuthProvider);
    }
    return result.user.getIdToken();
}

function logInAPI(accessToken: string, { signinMethod }: LoginData) {
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

function* logIn(action: { data: LoginData }) {
    try {
        const accessToken = yield call(loginToken, action.data);
        const result = yield call(logInAPI, accessToken, action.data);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userId', result.data.user._id);
        yield put(loginSuccess());
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
        yield put(loginFailure(errorMessage));
    }
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* logOut() {
    try {
        firebase.auth().signOut();
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
        yield put(logoutSuccess());
    } catch (err) {
        yield put(logoutFailure(err.message));
    }
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

type SignupData = {
    email: string;
    password: string;
    name?: string;
    mobile?: string;
    signinMethod?: string;
};

async function signupToken({ email, password }: SignupData) {
    await auth.signInWithEmailLink(email, location.href);
    const user = auth.currentUser as firebase.User;
    await user.updatePassword(password);
    const accessToken = await user.getIdToken();
    return accessToken;
}

async function emailCheckAPI(email: string) {
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

function* emailCheck(action: { email: string }) {
    try {
        yield call(emailCheckAPI, action.email);
        yield put(emailCheckSuccess());
    } catch (err) {
        yield put(emailCheckFailure('이미 가입된 이메일 입니다.'));
    }
}

function* watchEmailCheck() {
    yield takeLatest(EMAIL_CHECK_REQUEST, emailCheck);
}

function signUpAPI(accessToken: string, { email, name, mobile, signinMethod }: SignupData) {
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

function* signUp(action: { data: SignupData }) {
    try {
        const accessToken = yield call(signupToken, action.data);
        const result = yield call(signUpAPI, accessToken, action.data);
        localStorage.setItem('userId', result.data.user._id);
        localStorage.removeItem('emailForSignup');
        yield put(signupSuccess(accessToken));
    } catch (err) {
        yield put(signupFailure(err.message));
    }
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function registerServiceAPI(accessToken: string, data: FormData) {
    return axios({
        method: 'POST',
        url: 'http://localhost:5000/api/v1/services',
        headers: {
            accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        },
        data,
    });
}

function* registerService(action: { data: FormData; accessToken: string }) {
    try {
        const result = yield call(registerServiceAPI, action.accessToken, action.data);
        console.log(result);
        yield put(registerServiceSuccess(result.data.service));
    } catch (err) {
        yield put(registerServiceFailure(err.message));
    }
}

function* watchRegisterService() {
    yield takeLatest(REGISTER_SERVICE_REQUEST, registerService);
}

export default function* userSaga() {
    yield all([
        fork(watchLoadMyInfo),
        fork(watchEmailCheck),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchRegisterService),
    ]);
}

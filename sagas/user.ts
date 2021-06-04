/* eslint-disable no-restricted-globals */
import { destroyCookie, setCookie } from 'nookies';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import firebase from 'firebase/app';
import { auth, googleAuthProvider, facebookAuthProvider, getFirebaseToken } from '../firebase';
import { LoginData, Me, SignupData } from '../interfaces/data/user';
import {
    loadProfileSuccess,
    loadProfileFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutSuccess,
    logoutFailure,
    emailCheckRequest,
    emailCheckSuccess,
    emailCheckFailure,
    signupRequest,
    signupSuccess,
    signupFailure,
    changeProfileRequest,
    changeProfileSuccess,
    changeProfileFailure,
    LOG_IN_REQUEST,
    LOG_OUT_REQUEST,
    EMAIL_CHECK_REQUEST,
    SIGN_UP_REQUEST,
    LOAD_PROFILE_REQUEST,
    CHANGE_PROFILE_REQUEST,
    loadProfileRequest,
} from '../actions/user';

function firebaseLogin({ email, password, signinMethod }: LoginData) {
    if (signinMethod === 'password') {
        return auth.signInWithEmailAndPassword(email as string, password as string);
    }
    if (signinMethod === 'google') {
        return auth.signInWithPopup(googleAuthProvider);
    }
    if (signinMethod === 'facebook') {
        return auth.signInWithPopup(facebookAuthProvider);
    }
}

function logInAPI({ signinMethod }: LoginData, accessToken: string) {
    return axios({
        method: 'POST',
        url: '/api/v1/signin',
        data: { signinMethod },
        headers: { accessToken },
    });
}

function* logIn(action: ReturnType<typeof loginRequest>) {
    try {
        yield call(firebaseLogin, action.data);
        const accessToken: string = yield call(getFirebaseToken);
        const result: AxiosResponse<{ user: Me }> = yield call(logInAPI, action.data, accessToken);
        destroyCookie(null, 'token');
        destroyCookie(null, 'userId');
        destroyCookie(null, 'serviceId');
        setCookie(null, 'token', accessToken, { path: '/' });
        setCookie(null, 'userId', result.data.user._id, { path: '/' });
        if (result.data.user.service !== '') {
            setCookie(null, 'serviceId', result.data.user.service, { path: '/' });
        }
        yield put(loginSuccess(result.data.user));
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

function firebaseLogout() {
    firebase.auth().signOut();
}

function* logOut() {
    try {
        yield call(firebaseLogout);
        destroyCookie(null, 'token');
        destroyCookie(null, 'userId');
        destroyCookie(null, 'serviceId');
        yield put(logoutSuccess());
    } catch (err) {
        yield put(logoutFailure(err.message));
    }
}

async function emailCheckAPI(email: string) {
    axios({
        method: 'POST',
        url: '/api/v1/validation/email',
        data: { email },
    });
}

function firebaseEmailCheck(email: string) {
    const REDIRECT_URL = 'http://localhost:3000/user/signup';
    const config = {
        url: REDIRECT_URL,
        handleCodeInApp: true,
    };
    auth.sendSignInLinkToEmail(email, config);
}

function* emailCheck(action: ReturnType<typeof emailCheckRequest>) {
    try {
        yield call(emailCheckAPI, action.email);
        yield call(firebaseEmailCheck, action.email);
        localStorage.setItem('emailForSignup', action.email);
        yield put(emailCheckSuccess());
    } catch (err) {
        yield put(emailCheckFailure('이미 가입된 이메일 입니다.'));
    }
}

async function firebaseSignup({ email, password }: SignupData) {
    await auth.signInWithEmailLink(email, location.href);
    await auth.currentUser?.updatePassword(password);
}

function signUpAPI({ email, name, mobile, signinMethod }: SignupData, accessToken: string) {
    return axios({
        method: 'POST',
        url: '/api/v1/signup',
        data: { email, name, mobile, signinMethod },
        headers: { accessToken },
    });
}

function* signUp(action: ReturnType<typeof signupRequest>) {
    try {
        yield call(firebaseSignup, action.data);
        const accessToken: string = yield call(getFirebaseToken);
        const result: AxiosResponse<{ user: Me }> = yield call(signUpAPI, action.data, accessToken);
        destroyCookie(null, 'token');
        destroyCookie(null, 'userId');
        setCookie(null, 'token', accessToken, { path: '/' });
        setCookie(null, 'userId', result.data.user._id, { path: '/' });
        localStorage.removeItem('emailForSignup');
        yield put(signupSuccess(result.data.user));
    } catch (err) {
        yield put(signupFailure(err.message));
    }
}

function loadProfileAPI(userId: string) {
    return axios({
        method: 'GET',
        url: `/api/v1/users/${userId}`,
    });
}

function* loadProfile(action: ReturnType<typeof loadProfileRequest>) {
    try {
        const result: AxiosResponse<{ user: Me }> = yield call(loadProfileAPI, action.userId);
        yield put(loadProfileSuccess(result.data.user));
    } catch (err) {
        yield put(loadProfileFailure(err.message));
    }
}

async function changeProfileAPI(userId: string, data: FormData, accessToken: string) {
    return axios({
        method: 'PATCH',
        url: `/api/v1/users/${userId}`,
        data,
        headers: { accessToken },
    });
}

function* changeProfile(action: ReturnType<typeof changeProfileRequest>) {
    try {
        const accessToken: string = yield call(getFirebaseToken);
        const result: AxiosResponse<{ user: Me }> = yield call(
            changeProfileAPI,
            action.userId,
            action.data,
            accessToken,
        );
        yield put(changeProfileSuccess(result.data.user));
    } catch (err) {
        yield put(changeProfileFailure(err.message));
    }
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchEmailCheck() {
    yield takeLatest(EMAIL_CHECK_REQUEST, emailCheck);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchLoadProfile() {
    yield takeLatest(LOAD_PROFILE_REQUEST, loadProfile);
}

function* watchChangeProfile() {
    yield takeLatest(CHANGE_PROFILE_REQUEST, changeProfile);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchEmailCheck),
        fork(watchSignUp),
        fork(watchLoadProfile),
        fork(watchChangeProfile),
    ]);
}

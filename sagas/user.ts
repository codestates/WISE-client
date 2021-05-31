/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import firebase from 'firebase/app';
import { auth, googleAuthProvider, facebookAuthProvider } from '../firebase';
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
} from '../actions/user';

axios.defaults.withCredentials = true;

async function loginToken({ email, password, signinMethod }: LoginData) {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    let result = null;
    if (signinMethod === 'password') {
        result = await auth.signInWithEmailAndPassword(email as string, password as string);
    } else if (signinMethod === 'google') {
        googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
        result = await auth.signInWithPopup(googleAuthProvider);
    } else if (signinMethod === 'facebook') {
        facebookAuthProvider.setCustomParameters({ display: 'popup' });
        result = await auth.signInWithPopup(facebookAuthProvider);
    }
    return result?.user?.getIdToken();
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

function* logIn(action: ReturnType<typeof loginRequest>) {
    try {
        const accessToken: string = yield call(loginToken, action.data);
        const result: AxiosResponse<{ user: Me }> = yield call(logInAPI, accessToken, action.data);
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

async function emailCheckAPI(email: string) {
    await axios.post('/api/v1/validation/email', {
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

function* emailCheck(action: ReturnType<typeof emailCheckRequest>) {
    try {
        yield call(emailCheckAPI, action.email);
        yield put(emailCheckSuccess());
    } catch (err) {
        yield put(emailCheckFailure('이미 가입된 이메일 입니다.'));
    }
}

async function signupToken({ email, password }: SignupData) {
    await auth.signInWithEmailLink(email, location.href);
    const user = auth.currentUser as firebase.User;
    await user.updatePassword(password);
    const accessToken = await user.getIdToken();
    return accessToken;
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

function* signUp(action: ReturnType<typeof signupRequest>) {
    try {
        const accessToken: string = yield call(signupToken, action.data);
        const result: AxiosResponse<{ user: Me }> = yield call(signUpAPI, accessToken, action.data);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userId', result.data.user._id);
        localStorage.removeItem('emailForSignup');
        yield put(signupSuccess());
    } catch (err) {
        yield put(signupFailure(err.message));
    }
}

function loadProfileAPI(userId: string) {
    return axios.get(`/api/v1/users/${userId}`);
}

function* loadProfile() {
    try {
        const userId = localStorage.getItem('userId') as string;
        const accessToken = localStorage.getItem('accessToken') as string;
        const result: AxiosResponse<{ user: Me }> = yield call(loadProfileAPI, userId);
        yield put(loadProfileSuccess(accessToken, result.data.user));
    } catch (err) {
        yield put(loadProfileFailure(err.message));
    }
}

function changeProfileAPI(userId: string, accessToken: string, data: FormData) {
    console.log('accessToken: ', accessToken);
    return axios.patch(`/api/v1/users/${userId}`, data, {
        headers: {
            accessToken,
        },
    });
}

function* changeProfile(action: ReturnType<typeof changeProfileRequest>) {
    try {
        const result: AxiosResponse<{ user: Me }> = yield call(
            changeProfileAPI,
            action.userId,
            action.accessToken,
            action.data,
        );
        console.log('result :', result.data);
        yield put(changeProfileSuccess(result.data.user));
    } catch (err) {
        console.log(err.message);
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

/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import firebase from 'firebase/app';
import Produce from '../util/produce';
import { auth, googleAuthProvider, facebookAuthProvider } from '../firebase';

// 액션 상수
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const EMAIL_CHECK_REQUEST = 'EMAIL_CHECK_REQUEST';
export const EMAIL_CHECK_SUCCESS = 'EMAIL_CHECK_SUCCESS';
export const EMAIL_CHECK_FAILURE = 'EMAIL_CHECK_FAILURE';

// initial state
export const initialState = {
    logInLoading: false, // 로그인
    logInDone: false,
    logInError: null,
    logOutLoading: false, // 로그아웃
    logOutDone: false,
    logOutError: null,
    emailCheckLoading: false, // 이메일 인증
    emailCheckDone: false,
    emailCheckError: null,
    signUpLoading: false, // 회원가입
    signUpDone: false,
    signUpError: null,
    accessToken: null,
    me: null,
};

// 액션 크리에이터
export const logIn = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOG_IN_REQUEST,
        });

        const result = await auth.signInWithEmailAndPassword(email, password);
        const accessToken = await result.user.getIdToken();

        const response = await axios.post(
            'http://localhost:5000/api/v1/signin',
            { signinMethod: 'password' },
            {
                headers: {
                    accessToken,
                },
            },
        );
        dispatch({
            type: LOG_IN_SUCCESS,
            payload: response.data.user,
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
        }
        console.log('firebase ErrMsg : ', err.message);
        console.log('Change ErrMsg : ', errorMessage);
        dispatch({
            type: LOG_IN_FAILURE,
            error: errorMessage,
        });
    }
};

export const googleLogIn = () => async (dispatch) => {
    try {
        dispatch({
            type: LOG_IN_REQUEST,
        });
        googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
        const result = await auth.signInWithPopup(googleAuthProvider);

        const accessToken = await result.user.getIdToken();

        const response = await axios.post(
            'http://localhost:5000/api/v1/signin',
            { signinMethod: 'google' },
            {
                headers: {
                    accessToken,
                },
            },
        );
        dispatch({
            type: LOG_IN_SUCCESS,
            payload: response.data.user,
            token: accessToken,
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: LOG_IN_FAILURE,
            error: '동일한 이메일의 계정이 이미 존재합니다.',
        });
    }
};

export const facebookLogIn = () => async (dispatch) => {
    try {
        dispatch({
            type: LOG_IN_REQUEST,
        });
        facebookAuthProvider.setCustomParameters({
            display: 'popup',
        });
        const result = await auth.signInWithPopup(facebookAuthProvider);
        const accessToken = await result.user.getIdToken();

        const response = await axios.post(
            'http://localhost:5000/api/v1/signin',
            { signinMethod: 'facebook' },
            {
                headers: {
                    accessToken,
                },
            },
        );
        dispatch({
            type: LOG_IN_SUCCESS,
            payload: response.data.user,
            token: accessToken,
        });
    } catch (err) {
        dispatch({
            type: LOG_IN_FAILURE,
            error: '동일한 이메일의 계정이 이미 존재합니다.',
        });
    }
};

export const logOut = () => async (dispatch) => {
    try {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
        firebase.auth().signOut();
        dispatch({
            type: LOG_OUT_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: LOG_OUT_FAILURE,
            payload: err,
        });
    }
};

export const emailCheck = (email) => async (dispatch) => {
    try {
        dispatch({
            type: EMAIL_CHECK_REQUEST,
        });
        await axios.post('http://localhost:5000/api/v1/email-validation', {
            email,
        });

        const REDIRECT_URL = 'http://localhost:3000/user/signup';
        // 리다이렉트 설정
        const config = {
            url: REDIRECT_URL,
            handleCodeInApp: true,
        };

        // 인증 메일 보내기
        await auth.sendSignInLinkToEmail(email, config);
        // 로컬 스토리지에 유저가 적은 이메일 저장 (2번 쓰지 않도록)
        localStorage.setItem('emailForSignup', email);

        dispatch({
            type: EMAIL_CHECK_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: EMAIL_CHECK_FAILURE,
            error: '이미 가입된 이메일 입니다.',
        });
    }
};

export const signUp = (email, name, password, mobile) => async (dispatch) => {
    try {
        dispatch({
            type: SIGN_UP_REQUEST,
        });

        await auth.signInWithEmailLink(email, location.href);

        const user = auth.currentUser;
        await user.updatePassword(password);
        const accessToken = await user.getIdToken();

        const response = await axios.post(
            'http://localhost:5000/api/v1/signup',
            { email, name, mobile, signinMethod: 'password' },
            {
                headers: {
                    accessToken,
                },
            },
        );
        console.log(response);
        dispatch({
            type: SIGN_UP_SUCCESS,
            payload: response.data.user,
            token: accessToken,
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: SIGN_UP_FAILURE,
            payload: err,
        });
    }
};

const reducer = (state = initialState, action) =>
    Produce(state, (draft) => {
        switch (action.type) {
            case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInError = null;
                draft.logInDone = false;
                break;
            case LOG_IN_SUCCESS:
                draft.logInLoading = false;
                draft.logInDone = true;
                draft.me = action.payload;
                draft.accessToken = action.token;
                break;
            case LOG_IN_FAILURE:
                draft.logInLoading = false;
                draft.logInError = action.error;
                break;
            case LOG_OUT_REQUEST:
                draft.logOutLoading = true;
                draft.logOutError = null;
                draft.logOutDone = false;
                break;
            case LOG_OUT_SUCCESS:
                draft.logOutLoading = false;
                draft.logOutDone = true;
                draft.me = null;
                draft.accessToken = null;
                break;
            case LOG_OUT_FAILURE:
                draft.logOutLoading = false;
                draft.logOutError = action.error;
                break;
            case SIGN_UP_REQUEST:
                draft.signUpLoading = true;
                draft.signUpError = null;
                draft.signUpDone = false;
                break;
            case SIGN_UP_SUCCESS:
                draft.signUpLoading = false;
                draft.signUpDone = true;
                draft.me = action.payload;
                draft.accessToken = action.token;
                break;
            case SIGN_UP_FAILURE:
                draft.signUpLoading = false;
                draft.signUpError = action.error;
                break;
            case EMAIL_CHECK_REQUEST:
                draft.emailCheckLoading = true;
                draft.emailCheckDone = false;
                draft.emailCheckError = null;
                break;
            case EMAIL_CHECK_SUCCESS:
                draft.emailCheckLoading = false;
                draft.emailCheckDone = true;
                draft.emailCheckError = null;
                break;
            case EMAIL_CHECK_FAILURE:
                draft.emailCheckLoading = false;
                draft.emailCheckError = action.error;
                break;
            default:
                break;
        }
    });

export default reducer;

/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import firebase from 'firebase/app';
import Produce from '../util/produce';
import { auth, googleAuthProvider } from '../firebase';

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

export const LINK_TO_EMAIL = 'LINK_TO_EMAIL';

// initial state
export const initialState = {
    logInLoading: false,
    logInDone: false,
    logInError: null,
    logOutLoading: false,
    logOutDone: false,
    logOutError: null,
    signUpLoading: false,
    signUpDone: false,
    signUpError: null,
    me: null,
    accessToken: null,
    linkToEmail: false,
};

// 액션 크리에이터
export const logIn =
    ({ role, email, password }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: LOG_IN_REQUEST,
            });
            console.log(role, email, password);
            const result = await auth.signInWithEmailAndPassword(email, password);
            console.log(result);
            const accessToken = await result.user.getIdToken();

            const response = await axios.post(
                'http://localhost:5000/api/v1/signin',
                { role },
                {
                    headers: {
                        accessToken,
                    },
                },
            );
            console.log(response);
            dispatch({
                type: LOG_IN_SUCCESS,
                payload: response.data,
                token: accessToken,
            });
        } catch (err) {
            console.log(err.message);
            dispatch({
                type: LOG_IN_FAILURE,
                payload: err,
            });
        }
    };

export const googleLogIn =
    ({ role }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: LOG_IN_REQUEST,
            });
            googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
            const result = await auth.signInWithPopup(googleAuthProvider);

            const accessToken = await result.user.getIdToken();
            console.log('role', role);
            const response = await axios.post(
                'http://localhost:5000/api/v1/signin',
                { role },
                {
                    headers: {
                        accessToken,
                    },
                },
            );
            console.log(response.data.user);
            dispatch({
                type: LOG_IN_SUCCESS,
                payload: response.data.user,
                token: accessToken,
            });
        } catch (err) {
            dispatch({
                type: LOG_IN_FAILURE,
                payload: err,
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
        console.error(err);
        dispatch({
            type: LOG_OUT_FAILURE,
            payload: err,
        });
    }
};

export const signUpAuth =
    ({ email }) =>
    async (dispatch) => {
        try {
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
                type: LINK_TO_EMAIL,
            });
        } catch (err) {
            console.error(err);
        }
    };

export const signUp =
    ({ role, email, name, password, mobile }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: SIGN_UP_REQUEST,
            });
            console.log('email : ', email);
            const result = await auth.signInWithEmailLink(email, location.href);
            console.log(result);

            const user = auth.currentUser;
            await user.updatePassword(password);
            const accessToken = await user.getIdToken();
            console.log('accessToken', accessToken);
            const response = await axios.post(
                'http://localhost:5000/api/v1/signup',
                { email, name, role, mobile },
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
            case LINK_TO_EMAIL:
                draft.linkToEmail = true;
                break;
            default:
                break;
        }
    });

export default reducer;

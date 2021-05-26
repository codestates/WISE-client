/* eslint-disable no-param-reassign */
import { UserAction } from '../interfaces/act/user';
import { ShortService } from '../interfaces/data/service';
import { User, UserState } from '../interfaces/data/user';
import Produce from '../utils/produce';

// 액션 상수
export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST' as const;
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS' as const;
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE' as const;

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST' as const;
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS' as const;
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE' as const;

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST' as const;
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS' as const;
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE' as const;

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST' as const;
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS' as const;
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE' as const;

export const EMAIL_CHECK_REQUEST = 'EMAIL_CHECK_REQUEST' as const;
export const EMAIL_CHECK_SUCCESS = 'EMAIL_CHECK_SUCCESS' as const;
export const EMAIL_CHECK_FAILURE = 'EMAIL_CHECK_FAILURE' as const;

export const REGISTER_SERVICE_REQUEST = 'REGISTER_SERVICE_REQUEST' as const;
export const REGISTER_SERVICE_SUCCESS = 'REGISTER_SERVICE_SUCCESS' as const;
export const REGISTER_SERVICE_FAILURE = 'REGISTER_SERVICE_FAILURE' as const;

// initial state
export const initialState = {
    loadMyInfoLoading: false, // 유저 정보 가져오기 시도중
    loadMyInfoDone: false,
    loadMyInfoError: null,
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
    registerServiceLoading: false, // 어시스턴트 등록
    registerServiceDone: false,
    registerServiceError: null,
    accessToken: null,
    me: null,
    registerService: null,
    islogin: false,
};

// 액션 크리에이터
export const loadMyInfoRequest = () => ({
    type: LOAD_MY_INFO_REQUEST,
});

export const loadMyInfoSuccess = (user: User, token: string) => ({
    type: LOAD_MY_INFO_SUCCESS,
    user,
    token,
});

export const loadMyInfoFailure = (error: string) => ({
    type: LOAD_MY_INFO_FAILURE,
    error,
});

export const loginRequest = (email: string, password: string) => ({
    type: LOG_IN_REQUEST,
    data: {
        email,
        password,
        signinMethod: 'password',
    },
});

export const loginSuccess = () => ({
    type: LOG_IN_SUCCESS,
});

export const loginFailure = (error: string) => ({
    type: LOG_IN_FAILURE,
    error,
});

export const oauthLoginRequest = (signinMethod: string) => ({
    type: LOG_IN_REQUEST,
    data: {
        signinMethod,
    },
});

export const logoutRequest = () => ({
    type: LOG_OUT_REQUEST,
});

export const logoutSuccess = () => ({
    type: LOG_OUT_SUCCESS,
});

export const logoutFailure = (error: string) => ({
    type: LOG_OUT_FAILURE,
    error,
});

export const emailCheckRequest = (email: string) => ({
    type: EMAIL_CHECK_REQUEST,
    email,
});

export const emailCheckSuccess = () => ({
    type: EMAIL_CHECK_SUCCESS,
});

export const emailCheckFailure = (error: string) => ({
    type: EMAIL_CHECK_FAILURE,
    error,
});

export const signupRequest = (email: string, name: string, password: string, mobile: string) => ({
    type: SIGN_UP_REQUEST,
    data: { email, name, password, mobile, signinMethod: 'password' },
});

export const signupSuccess = (token: string) => ({
    type: SIGN_UP_SUCCESS,
    token,
});

export const signupFailure = (error: string) => ({
    type: SIGN_UP_FAILURE,
    error,
});

export const registerServiceRequest = (data: FormData, accessToken: string) => ({
    type: REGISTER_SERVICE_REQUEST,
    data,
    accessToken,
});

export const registerServiceSuccess = (service: ShortService) => ({
    type: REGISTER_SERVICE_SUCCESS,
    service,
});

export const registerServiceFailure = (error: string) => ({
    type: REGISTER_SERVICE_FAILURE,
    error,
});

const reducer = (state = initialState, action: UserAction) =>
    Produce(state, (draft: UserState) => {
        switch (action.type) {
            case LOAD_MY_INFO_REQUEST:
                draft.loadMyInfoLoading = true;
                draft.loadMyInfoDone = false;
                draft.loadMyInfoError = null;
                break;
            case LOAD_MY_INFO_SUCCESS:
                draft.loadMyInfoLoading = false;
                draft.loadMyInfoDone = true;
                draft.islogin = true;
                draft.me = action.user;
                draft.accessToken = action.token;
                break;
            case LOAD_MY_INFO_FAILURE:
                draft.loadMyInfoLoading = false;
                draft.loadMyInfoError = action.error;
                break;
            case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInDone = false;
                draft.logInError = null;
                break;
            case LOG_IN_SUCCESS:
                draft.logInLoading = false;
                draft.logInDone = true;
                draft.islogin = true;
                break;
            case LOG_IN_FAILURE:
                draft.logInLoading = false;
                draft.logInError = action.error;
                break;
            case LOG_OUT_REQUEST:
                draft.logOutLoading = true;
                draft.logOutDone = false;
                draft.logOutError = null;
                break;
            case LOG_OUT_SUCCESS:
                draft.logOutLoading = false;
                draft.logOutDone = true;
                draft.islogin = false;
                draft.me = null;
                draft.accessToken = null;
                break;
            case LOG_OUT_FAILURE:
                draft.logOutLoading = false;
                draft.logOutError = action.error;
                break;
            case SIGN_UP_REQUEST:
                draft.signUpLoading = true;
                draft.signUpDone = false;
                draft.signUpError = null;
                break;
            case SIGN_UP_SUCCESS:
                draft.signUpLoading = false;
                draft.signUpDone = true;
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
                break;
            case EMAIL_CHECK_FAILURE:
                draft.emailCheckLoading = false;
                draft.emailCheckError = action.error;
                break;
            case REGISTER_SERVICE_REQUEST:
                draft.registerServiceLoading = true;
                draft.registerServiceDone = false;
                draft.registerServiceError = null;
                break;
            case REGISTER_SERVICE_SUCCESS:
                draft.registerServiceLoading = false;
                draft.registerServiceDone = true;
                draft.registerService = action.service;
                break;
            case REGISTER_SERVICE_FAILURE:
                draft.registerServiceLoading = false;
                draft.registerServiceError = action.error;
                break;
            default:
                break;
        }
    });

export default reducer;

import {
    LOAD_MY_INFO_REQUEST,
    LOAD_MY_INFO_SUCCESS,
    LOAD_MY_INFO_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    EMAIL_CHECK_REQUEST,
    EMAIL_CHECK_SUCCESS,
    EMAIL_CHECK_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    REGISTER_SERVICE_REQUEST,
    REGISTER_SERVICE_SUCCESS,
    REGISTER_SERVICE_FAILURE,
} from '../interfaces/act/user';
import { ShortService } from '../interfaces/data/service';
import { User } from '../interfaces/data/user';

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

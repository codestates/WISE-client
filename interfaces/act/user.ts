import {
    loadMyInfoRequest,
    loadMyInfoSuccess,
    loadMyInfoFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    oauthLoginRequest,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    emailCheckRequest,
    emailCheckSuccess,
    emailCheckFailure,
    signupRequest,
    signupSuccess,
    signupFailure,
    registerServiceRequest,
    registerServiceSuccess,
    registerServiceFailure,
} from '../../actions/user';

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

export type UserAction =
    | ReturnType<typeof loadMyInfoRequest>
    | ReturnType<typeof loadMyInfoSuccess>
    | ReturnType<typeof loadMyInfoFailure>
    | ReturnType<typeof loginRequest>
    | ReturnType<typeof loginSuccess>
    | ReturnType<typeof loginFailure>
    | ReturnType<typeof oauthLoginRequest>
    | ReturnType<typeof logoutRequest>
    | ReturnType<typeof logoutSuccess>
    | ReturnType<typeof logoutFailure>
    | ReturnType<typeof emailCheckRequest>
    | ReturnType<typeof emailCheckSuccess>
    | ReturnType<typeof emailCheckFailure>
    | ReturnType<typeof signupRequest>
    | ReturnType<typeof signupSuccess>
    | ReturnType<typeof signupFailure>
    | ReturnType<typeof registerServiceRequest>
    | ReturnType<typeof registerServiceSuccess>
    | ReturnType<typeof registerServiceFailure>;

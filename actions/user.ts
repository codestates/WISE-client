import { Me } from '../interfaces/data/user';

// 액션 상수
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST' as const;
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS' as const;
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE' as const;

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST' as const;
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS' as const;
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE' as const;

export const EMAIL_CHECK_REQUEST = 'EMAIL_CHECK_REQUEST' as const;
export const EMAIL_CHECK_SUCCESS = 'EMAIL_CHECK_SUCCESS' as const;
export const EMAIL_CHECK_FAILURE = 'EMAIL_CHECK_FAILURE' as const;

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST' as const;
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS' as const;
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE' as const;

export const LOAD_PROFILE_REQUEST = 'LOAD_PROFILE_REQUEST' as const;
export const LOAD_PROFILE_SUCCESS = 'LOAD_PROFILE_SUCCESS' as const;
export const LOAD_PROFILE_FAILURE = 'LOAD_PROFILE_FAILURE' as const;

export const CHANGE_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST' as const;
export const CHANGE_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS' as const;
export const CHANGE_PROFILE_FAILURE = 'EDIT_PROFILE_FAILURE' as const;

// 액션 크리에이터
export const loginRequest = (signinMethod: string, email?: string, password?: string) => ({
    type: LOG_IN_REQUEST,
    data: {
        signinMethod,
        email,
        password,
    },
});

export const loginSuccess = (me: Me) => ({
    type: LOG_IN_SUCCESS,
    me,
});

export const loginFailure = (error: string) => ({
    type: LOG_IN_FAILURE,
    error,
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

export const signupSuccess = (me: Me) => ({
    type: SIGN_UP_SUCCESS,
    me,
});

export const signupFailure = (error: string) => ({
    type: SIGN_UP_FAILURE,
    error,
});

export const loadProfileRequest = (userId: string) => ({
    type: LOAD_PROFILE_REQUEST,
    userId,
});

export const loadProfileSuccess = (me: Me) => ({
    type: LOAD_PROFILE_SUCCESS,
    me,
});

export const loadProfileFailure = (error: string) => ({
    type: LOAD_PROFILE_FAILURE,
    error,
});

export const changeProfileRequest = (userId: string, data: FormData) => ({
    type: CHANGE_PROFILE_REQUEST,
    userId,
    data,
});

export const changeProfileSuccess = (me: Me) => ({
    type: CHANGE_PROFILE_SUCCESS,
    me,
});

export const changeProfileFailure = (error: string) => ({
    type: CHANGE_PROFILE_FAILURE,
    error,
});

import Produce from '../util/produce';

// 액션 상수
export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

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
    accessToken: null,
    me: null,
};

// 액션 크리에이터
export const loadMyInfo = () => ({
    type: LOAD_MY_INFO_REQUEST,
});

export const loginRequestAction = (email, password) => ({
    type: LOG_IN_REQUEST,
    data: {
        email,
        password,
        signinMethod: 'password',
    },
});

export const oauthLoginRequestAction = (signinMethod) => ({
    type: LOG_IN_REQUEST,
    data: {
        signinMethod,
    },
});

export const logoutRequestAction = () => ({
    type: LOG_OUT_REQUEST,
});

export const emailCheckRequestAction = (email) => ({
    type: EMAIL_CHECK_REQUEST,
    email,
});

export const signupRequestAction = (email, name, password, mobile) => ({
    type: SIGN_UP_REQUEST,
    data: { email, name, password, mobile, signinMethod: 'password' },
});

const reducer = (state = initialState, action) =>
    Produce(state, (draft) => {
        switch (action.type) {
            case LOAD_MY_INFO_REQUEST:
                draft.loadMyInfoLoading = true;
                draft.loadMyInfoError = null;
                draft.loadMyInfoDone = false;
                break;
            case LOAD_MY_INFO_SUCCESS: {
                draft.loadMyInfoLoading = false;
                draft.me = action.payload;
                draft.loadMyInfoDone = true;
                draft.accessToken = action.token;
                break;
            }
            case LOAD_MY_INFO_FAILURE:
                draft.loadMyInfoLoading = false;
                draft.loadMyInfoError = action.error;
                break;
            case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInError = null;
                draft.logInDone = false;
                break;
            case LOG_IN_SUCCESS:
                draft.logInLoading = false;
                draft.logInDone = true;
                // draft.me = action.payload;
                // draft.accessToken = action.token;
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

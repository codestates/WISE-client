/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
    EDIT_PROFILE_FAILURE,
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EMAIL_CHECK_FAILURE,
    EMAIL_CHECK_REQUEST,
    EMAIL_CHECK_SUCCESS,
    LOAD_MY_INFO_FAILURE,
    LOAD_MY_INFO_REQUEST,
    LOAD_MY_INFO_SUCCESS,
    LOAD_ORDERS_FAILURE,
    LOAD_ORDERS_REQUEST,
    LOAD_ORDERS_SUCCESS,
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    REGISTER_SERVICE_FAILURE,
    REGISTER_SERVICE_REQUEST,
    REGISTER_SERVICE_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    UserAction,
} from '../interfaces/act/user';
import { UserState } from '../interfaces/data/user';

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
    loadOrdersLoading: false, // 유저 주문내역
    loadOrdersDone: false,
    loadOrdersError: null,
    editProfileLoading: false, // 유저 프로필 수정
    editProfileDone: false,
    editProfileError: null,
    accessToken: null,
    me: null,
    registerService: null,
    islogin: false,
    applyOrdersC: null,
    acceptOrdersC: null,
    completeOrdersC: null,
    applyOrdersA: null,
    acceptOrdersA: null,
    completeOrdersA: null,
};

const reducer = (state = initialState, action: UserAction) =>
    produce(state, (draft: UserState) => {
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
            case LOAD_ORDERS_REQUEST:
                draft.loadOrdersLoading = true;
                draft.loadOrdersDone = false;
                draft.loadOrdersError = null;
                break;
            case LOAD_ORDERS_SUCCESS: {
                draft.loadOrdersLoading = false;
                draft.loadOrdersDone = true;
                if (action.userType === 'customer') {
                    draft.applyOrdersC = action.orders.filter((v) => v.state === 'apply');
                    draft.acceptOrdersC = action.orders.filter((v) => v.state === 'accept');
                    draft.completeOrdersC = action.orders.filter((v) => v.state === 'complete');
                } else {
                    draft.applyOrdersA = action.orders.filter((v) => v.state === 'apply');
                    draft.acceptOrdersA = action.orders.filter((v) => v.state === 'accept');
                    draft.completeOrdersA = action.orders.filter((v) => v.state === 'complete');
                }
                break;
            }
            case LOAD_ORDERS_FAILURE:
                draft.loadOrdersLoading = false;
                draft.loadOrdersError = action.error;
                break;
            case EDIT_PROFILE_REQUEST:
                draft.editProfileLoading = true;
                draft.editProfileDone = false;
                draft.editProfileError = null;
                break;
            case EDIT_PROFILE_SUCCESS:
                draft.editProfileLoading = false;
                draft.editProfileDone = true;
                draft.me = action.user;
                break;
            case EDIT_PROFILE_FAILURE:
                draft.editProfileLoading = false;
                draft.editProfileError = action.error;
                break;
            default:
                break;
        }
    });

export default reducer;

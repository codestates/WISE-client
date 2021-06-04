/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
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
    LOAD_PROFILE_REQUEST,
    LOAD_PROFILE_SUCCESS,
    LOAD_PROFILE_FAILURE,
    CHANGE_PROFILE_REQUEST,
    CHANGE_PROFILE_SUCCESS,
    CHANGE_PROFILE_FAILURE,
} from '../actions/user';
import { UserAction } from '../interfaces/act/user';
import { UserState } from '../interfaces/data/user';

// initial state
export const initialState: UserState = {
    me: null,
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
    loadProfileLoading: false, // 프로필 조회
    loadProfileDone: false,
    loadProfileError: null,
    changeProfileLoading: false, // 프로필 수정
    changeProfileDone: false,
    changeProfileError: null,
};

const reducer = (state = initialState, action: UserAction) =>
    produce(state, (draft: UserState) => {
        switch (action.type) {
            case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInDone = false;
                draft.logInError = null;
                break;
            case LOG_IN_SUCCESS:
                draft.logInLoading = false;
                draft.logInDone = true;
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
                draft.me = null;
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
            case LOAD_PROFILE_REQUEST:
                draft.loadProfileLoading = true;
                draft.loadProfileDone = false;
                draft.loadProfileError = null;
                break;
            case LOAD_PROFILE_SUCCESS: {
                draft.loadProfileLoading = false;
                draft.loadProfileDone = true;
                draft.me = action.me;
                break;
            }
            case LOAD_PROFILE_FAILURE:
                draft.loadProfileLoading = false;
                draft.loadProfileError = action.error;
                break;
            case CHANGE_PROFILE_REQUEST:
                draft.changeProfileLoading = true;
                draft.changeProfileDone = false;
                draft.changeProfileError = null;
                break;
            case CHANGE_PROFILE_SUCCESS:
                draft.changeProfileLoading = false;
                draft.changeProfileDone = true;
                draft.me = action.me;
                break;
            case CHANGE_PROFILE_FAILURE:
                draft.changeProfileLoading = false;
                draft.changeProfileError = action.error;
                break;
            default:
                break;
        }
    });

export default reducer;

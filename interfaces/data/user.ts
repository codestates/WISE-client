import { ShortService } from './service';

export interface User {
    _id: string;
    email: string;
    name: string;
    signinMethod: string;
    mobile: string;
    image: string;
    isAssistant: boolean;
}

export type UserState = {
    loadMyInfoLoading: boolean; // 유저 정보 가져오기 시도중
    loadMyInfoDone: boolean;
    loadMyInfoError: null | string;
    logInLoading: boolean; // 로그인
    logInDone: boolean;
    logInError: null | string;
    logOutLoading: boolean; // 로그아웃
    logOutDone: boolean;
    logOutError: null | string;
    emailCheckLoading: boolean; // 이메일 인증
    emailCheckDone: boolean;
    emailCheckError: null | string;
    signUpLoading: boolean; // 회원가입
    signUpDone: boolean;
    signUpError: null | string;
    registerServiceLoading: boolean; // 어시스턴트 등록
    registerServiceDone: boolean;
    registerServiceError: null | string;
    accessToken: null | string;
    me: null | User;
    registerService: null | ShortService;
    islogin: boolean;
};

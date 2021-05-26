export type UserState = {
    loadMyInfoLoading: boolean; // 유저 정보 가져오기 시도중
    loadMyInfoDone: boolean;
    loadMyInfoError: null | Error;
    logInLoading: boolean; // 로그인
    logInDone: boolean;
    logInError: null | Error;
    logOutLoading: boolean; // 로그아웃
    logOutDone: boolean;
    logOutError: null | Error;
    emailCheckLoading: boolean; // 이메일 인증
    emailCheckDone: boolean;
    emailCheckError: null | Error;
    signUpLoading: boolean; // 회원가입
    signUpDone: boolean;
    signUpError: null | Error;
    registerServiceLoading: boolean; // 어시스턴트 등록
    registerServiceDone: boolean;
    registerServiceError: null | Error;
    accessToken: null | string;
    me: null;
    registerService: null;
    islogin: boolean;
};

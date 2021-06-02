export type LoginData = {
    email?: string;
    password?: string;
    signinMethod: string;
};

export type SignupData = {
    email: string;
    password: string;
    name?: string;
    mobile?: string;
    signinMethod?: string;
};

export interface Me {
    _id: string;
    email: string;
    name: string;
    mobile: string;
    image: string;
    service: string;
}

export type UserState = {
    me: null | Me;
    islogin: boolean;
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
    loadProfileLoading: boolean; // 유저 정보 가져오기 시도중
    loadProfileDone: boolean;
    loadProfileError: null | string;
    changeProfileLoading: boolean;
    changeProfileDone: boolean;
    changeProfileError: null | string;
};

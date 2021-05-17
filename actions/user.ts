import axios from 'axios';
import { initialState } from '../reducers/user';

axios.defaults.withCredentials = true;

/* ------- action 상수 ------ */
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_OUT = 'LOG_OUT';

export const GET_USER = 'GET_USER';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

export const WITHDRAWAL = 'WITHDRAWAL';

// 리덕스 구조
const initialState = {
    role: 'customer',
    user: {
        _id: '1',
        name: 'ksh',
        phone: '1234',
        avatar: 'sample.png',
    },
    accessToken: 'asdfasdf',
};

import axios from 'axios';

axios.defaults.withCredentials = true;

/* ------- action 상수 ------ */

// 어시스턴트 이름, 지역, 시급, 요일 (가능한 날짜), 시간 (가능한 시간대 - 오전,오후)
export const GET_SERVICE_INFO = 'GET_SERVICE_INFO';
export const GET_SERVICE_INFO_FAILURE = 'GET_SERVICE_INFO_FAILURE';

// 후기
export const LOAD_FIRST_REVIEWS_REQUEST = 'LOAD_FIRST_REVIEWS_REQUEST';
export const LOAD_FIRST_REVIEWS_SUCCESS = 'LOAD_FIRST_REVIEWS_SUCCESS';
export const LOAD_FIRST_REVIEWS_FAILURE = 'LOAD_FIRST_REVIEWS_FAILURE';

export const LOAD_MORE_REVIEWS_REQUEST = 'LOAD_MORE_REVIEWS_REQUEST';
export const LOAD_MORE_REVIEWS_SUCCESS = 'LOAD_MORE_REVIEWS_SUCCESS';
export const LOAD_MORE_REVIEWS_FAILURE = 'LOAD_MORE_REVIEWS_FAILURE';

// 모든 서비스 정보
export const LOAD_ALL_SERVICES_REQUEST = 'LOAD_ALL_SERVICES_REQUEST';
export const LOAD_ALL_SERVICES_SUCCESS = 'LOAD_ALL_SERVICES_SUCCESS';
export const LOAD_ALL_SERVICES_FAILURE = 'LOAD_ALL_SERVICES_FAILURE';

// 날짜, 지역, 시간 (오전/오후), 픽업장소, 병원, 소요 시간(ex. 3시간) post 요청
export const CREATE_RESERVATION = 'CREATE_RESERVATION';

// 날짜, 시간 (오전/오후), 픽업장소, 병원, 소요 시간(ex. 3시간)
export const GET_RESERVATION_INFO = 'GET_RESERVATION_INFO';

// 결제 결과
export const CHECK_OUT_SUCCESS = 'CHECK_OUT_SUCCESS';

/* ------- action creators ------ */
export const loadServicesAction = (accessToken) => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_ALL_SERVICES_REQUEST,
        });
        const response = await axios.get('http://localhost:5000/api/v1/services', {
            headers: {
                accessToken,
            },
        });
        console.log(response);
        dispatch({
            type: LOAD_ALL_SERVICES_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: LOAD_ALL_SERVICES_FAILURE,
            payload: err,
        });
    }
};

export const getSingleServiceAction = (serviceId) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/v1/services/${serviceId}`);
        console.log(response);
        dispatch({
            type: GET_SERVICE_INFO,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: GET_SERVICE_INFO_FAILURE,
            payload: err,
        });
    }
};

export const loadFirstReviewsAction = (serviceId) => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_FIRST_REVIEWS_REQUEST,
        });
        const response = await axios.get(`http://localhost:5000/api/v1/reviews?serviceId=${serviceId}&page=${1}`);
        console.log(response);
        dispatch({
            type: LOAD_FIRST_REVIEWS_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: LOAD_FIRST_REVIEWS_FAILURE,
            payload: err,
        });
    }
};

export const loadMoreReviewsAction = (serviceId, page) => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_MORE_REVIEWS_REQUEST,
        });
        const response = await axios.get(`http://localhost:5000/api/v1/reviews?serviceId=${serviceId}&page=${page}`);
        console.log(response);
        dispatch({
            type: LOAD_MORE_REVIEWS_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: LOAD_MORE_REVIEWS_FAILURE,
            payload: err,
        });
    }
};

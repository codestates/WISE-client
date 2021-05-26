/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {
    ActionRequest,
    CREATE_RESERVATION_FAILURE,
    CREATE_RESERVATION_REQUEST,
    CREATE_RESERVATION_SUCCESS,
    GET_ALL_RESERVATIONS_REQUEST,
    GET_ALL_RESERVATIONS_SUCCESS,
    GET_ALL_RESERVATIONS_FAILURE,
    GET_RESERVATION_INFO_FAILURE,
    GET_RESERVATION_INFO_REQUEST,
    GET_RESERVATION_INFO_SUCCESS,
    GET_SERVICE_INFO_FAILURE,
    GET_SERVICE_INFO_REQUEST,
    GET_SERVICE_INFO_SUCCESS,
    LOAD_FIRST_REVIEWS_FAILURE,
    LOAD_FIRST_REVIEWS_REQUEST,
    LOAD_FIRST_REVIEWS_SUCCESS,
    LOAD_MORE_REVIEWS_FAILURE,
    LOAD_MORE_REVIEWS_REQUEST,
    LOAD_MORE_REVIEWS_SUCCESS,
    LOAD_POPULAR_SERVICE_FAILURE,
    LOAD_POPULAR_SERVICE_REQUEST,
    LOAD_POPULAR_SERVICE_SUCCESS,
    LOAD_SEARCH_SERVICE_FAILURE,
    LOAD_SEARCH_SERVICE_REQUEST,
    LOAD_SEARCH_SERVICE_SUCCESS,
    LOAD_TOTAL_SERVICE_FAILURE,
    LOAD_TOTAL_SERVICE_REQUEST,
    LOAD_TOTAL_SERVICE_SUCCESS,
    RESERVATION_ACCEPT_FAILURE,
    RESERVATION_ACCEPT_REQUEST,
    RESERVATION_ACCEPT_SUCCESS,
    RESERVATION_REJECT_FAILURE,
    RESERVATION_REJECT_REQUEST,
    RESERVATION_REJECT_SUCCESS,
    CHECK_OUT_REQUEST,
    CHECK_OUT_SUCCESS,
    CHECK_OUT_FAILURE,
} from '../interfaces/act/services';
import { ServiceState, ShortService } from '../interfaces/data/service';

import Produce from '../utils/produce';

/* ------- initial state ------ */
export const initialState: ServiceState = {
    popularServices: [],
    totalServices: [],
    totalServicesCount: 0,
    searchServices: [],
    searchServicesCount: 0,
    searchQuery: null,
    service: null,
    reviews: [],
    popularServicesLoading: false, // 인기 서비스 불러오기
    popularServicesDone: false,
    popularServicesError: null,
    totalServicesLoading: false, // 전체 서비스 불러오기
    totalServicesDone: false,
    totalServicesError: null,
    searchServicesLoading: false, // 검색 서비스 불러오기
    searchServicesDone: false,
    searchServicesError: null,
    getSingleServiceLoading: false,
    getSingleServiceDone: false,
    getSingleServiceError: null,
    loadFirstReviewsLoading: false,
    loadFirstReviewsDone: false,
    loadFirstReviewsError: null,
    loadMoreReviewsLoading: false,
    loadMoreReviewsDone: false,
    loadMoreReviewsError: null,
    reservationRequestDone: false,
    reservationRequestError: null,
    getAllReservationsDone: false,
    reservationRequests: [],
    getAllReservationsError: null,
    getReservationInfoDone: false,
    getReservationInfo: null,
    getReservationInfoError: null,
    reservationAcceptedDone: false,
    reservationAccepted: null,
    reservationAcceptedError: null,
    reservationRejectedDone: false,
    reservationRejectedError: null,
    checkoutDone: false,
    checkoutStatus: null,
    checkoutError: null,
    notifications: [],
};

/* ------- reducer ------ */
const reducer = (state = initialState, action: ActionRequest) =>
    Produce(state, (draft: ServiceState) => {
        switch (action.type) {
            case LOAD_POPULAR_SERVICE_REQUEST:
                draft.popularServicesLoading = true;
                draft.popularServicesDone = false;
                draft.popularServicesError = null;
                break;
            case LOAD_POPULAR_SERVICE_SUCCESS:
                draft.popularServicesLoading = false;
                draft.popularServicesDone = true;
                draft.popularServices = action.popularServices;
                break;
            case LOAD_POPULAR_SERVICE_FAILURE:
                draft.popularServicesLoading = false;
                draft.popularServicesError = action.error;
                break;
            case LOAD_TOTAL_SERVICE_REQUEST:
                draft.totalServicesLoading = true;
                draft.totalServicesDone = false;
                draft.totalServicesError = null;
                break;
            case LOAD_TOTAL_SERVICE_SUCCESS:
                draft.totalServicesLoading = false;
                draft.totalServicesDone = true;
                draft.totalServices = (draft.totalServices as ShortService[]).concat(action.totalServices);
                draft.totalServicesCount = action.totalServicesCount;
                break;
            case LOAD_TOTAL_SERVICE_FAILURE:
                draft.totalServicesLoading = false;
                draft.totalServicesError = action.error;
                break;
            case LOAD_SEARCH_SERVICE_REQUEST:
                draft.searchServicesLoading = true;
                draft.searchServicesDone = false;
                draft.searchServicesError = null;
                break;
            case LOAD_SEARCH_SERVICE_SUCCESS: {
                draft.searchServicesLoading = false;
                draft.searchServicesDone = true;
                if (action.searchQuery.page === 1) {
                    draft.searchServices = action.searchServices;
                } else {
                    draft.searchServices = (draft.searchServices as ShortService[]).concat(action.searchServices);
                }
                draft.searchServicesCount = action.searchServicesCount;
                draft.searchQuery = action.searchQuery;
                break;
            }
            case LOAD_SEARCH_SERVICE_FAILURE:
                draft.searchServicesLoading = false;
                draft.searchServicesError = action.error;
                break;
            case GET_SERVICE_INFO_REQUEST:
                draft.getSingleServiceLoading = true;
                draft.getSingleServiceDone = false;
                draft.getSingleServiceError = null;
                break;
            case GET_SERVICE_INFO_SUCCESS:
                draft.getSingleServiceLoading = false;
                draft.getSingleServiceDone = true;
                draft.service = action.service;
                break;
            case GET_SERVICE_INFO_FAILURE:
                draft.getSingleServiceDone = false;
                draft.getSingleServiceError = action.error;
                break;
            case LOAD_FIRST_REVIEWS_REQUEST:
                draft.loadFirstReviewsLoading = true;
                draft.loadFirstReviewsDone = false;
                draft.loadFirstReviewsError = null;
                break;
            case LOAD_FIRST_REVIEWS_SUCCESS:
                draft.loadFirstReviewsLoading = false;
                draft.loadFirstReviewsDone = true;
                draft.reviews = [...action.reviews];
                break;
            case LOAD_FIRST_REVIEWS_FAILURE:
                draft.loadFirstReviewsLoading = false;
                draft.loadFirstReviewsError = action.error;
                break;
            case LOAD_MORE_REVIEWS_REQUEST:
                draft.loadMoreReviewsLoading = true;
                draft.loadMoreReviewsDone = false;
                draft.loadMoreReviewsError = null;
                break;
            case LOAD_MORE_REVIEWS_SUCCESS:
                draft.loadMoreReviewsLoading = false;
                draft.loadMoreReviewsDone = true;
                draft.reviews = [...action.reviews];
                break;
            case LOAD_MORE_REVIEWS_FAILURE:
                draft.loadMoreReviewsLoading = false;
                draft.getSingleServiceError = action.error;
                break;
            case CREATE_RESERVATION_REQUEST:
                draft.reservationRequestDone = false;
                draft.reservationRequestError = null;
                break;
            case CREATE_RESERVATION_SUCCESS:
                draft.reservationRequestDone = true;
                break;
            case CREATE_RESERVATION_FAILURE:
                draft.reservationRequestError = action.error;
                break;
            case GET_ALL_RESERVATIONS_REQUEST:
                draft.getAllReservationsDone = false;
                draft.getAllReservationsError = null;
                break;
            case GET_ALL_RESERVATIONS_SUCCESS:
                draft.getAllReservationsDone = true;
                draft.reservationRequests = [...action.orders];
                break;
            case GET_ALL_RESERVATIONS_FAILURE:
                draft.getAllReservationsError = action.error;
                break;
            case GET_RESERVATION_INFO_REQUEST:
                draft.getReservationInfoDone = false;
                draft.getReservationInfo = null;
                draft.getReservationInfoError = null;
                break;
            case GET_RESERVATION_INFO_SUCCESS:
                draft.getReservationInfoDone = true;
                draft.getReservationInfo = action.order;
                break;
            case GET_RESERVATION_INFO_FAILURE:
                draft.getReservationInfoError = action.error;
                break;
            case RESERVATION_ACCEPT_REQUEST:
                draft.reservationAccepted = null;
                draft.reservationAcceptedError = null;
                break;
            case RESERVATION_ACCEPT_SUCCESS:
                draft.reservationAcceptedDone = true;
                draft.reservationAccepted = action.order;
                break;
            case RESERVATION_ACCEPT_FAILURE:
                draft.reservationAcceptedError = action.error;
                break;
            case RESERVATION_REJECT_REQUEST:
                draft.reservationRejectedDone = false;
                draft.reservationRejectedError = null;
                break;
            case RESERVATION_REJECT_SUCCESS:
                draft.reservationRejectedDone = true;
                break;
            case RESERVATION_REJECT_FAILURE:
                draft.reservationRejectedError = action.error;
                break;
            case CHECK_OUT_REQUEST:
                draft.checkoutDone = false;
                draft.checkoutError = null;
                break;
            case CHECK_OUT_SUCCESS:
                draft.checkoutDone = true;
                draft.checkoutStatus = action.status;
                break;
            case CHECK_OUT_FAILURE:
                draft.checkoutError = action.error;
                break;
            default:
                break;
        }
    });

export default reducer;

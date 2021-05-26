/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {
    ActionRequest,
    CREATE_RESERVATION_FAILURE,
    CREATE_RESERVATION_REQUEST,
    CREATE_RESERVATION_SUCCESS,
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
} from '../interfaces/act/services';
// import { IActionsService } from '../interfaces/act/service';
import { ServiceState } from '../interfaces/data/service';

import Produce from '../utils/produce';

/* ------- initial state ------ */
export const initialState: ServiceState = {
    popularService: [],
    totalService: [],
    totalServiceCount: 0,
    searchService: [],
    searchServiceCount: 0,
    searchQuery: null,
    service: null,
    reviews: [],
    popularServiceLoading: false, // 인기 서비스 불러오기
    popularServiceDone: false,
    popularServiceError: null,
    totalServiceLoading: false, // 전체 서비스 불러오기
    totalServiceDone: false,
    totalServiceError: null,
    searchServiceLoading: false, // 검색 서비스 불러오기
    searchServiceDone: false,
    searchServiceError: null,
    loadAllServicesLoading: false,
    loadAllServicesDone: false,
    loadAllServicesError: null,
    getSingleServiceLoading: false,
    getSingleServiceDone: false,
    getSingleServiceError: null,
    loadFirstReviewsLoading: false,
    loadFirstReviewsDone: false,
    loadFirstReviewsError: null,
    loadMoreReviewsLoading: false,
    loadMoreReviewsDone: false,
    loadMoreReviewsError: null,
    reservationRequests: [],
    reservationRequestDone: false,
    reservationRequestError: null,
    getReservationInfoDone: false,
    getReservationInfo: null,
    getReservationInfoError: null,
    reservationAcceptedDone: false,
    reservationAccepted: null,
    reservationAcceptedError: null,
    reservationRejectedDone: false,
    reservationRejectedError: null,
    reservationComplete: null,
    reservationCompleteError: null,
};

/* ------- reducer ------ */
const reducer = (state = initialState, action: ActionRequest) =>
    Produce(state, (draft: ServiceState) => {
        switch (action.type) {
            case LOAD_POPULAR_SERVICE_REQUEST:
                draft.popularServiceLoading = true;
                draft.popularServiceDone = false;
                draft.popularServiceError = null;
                break;
            case LOAD_POPULAR_SERVICE_SUCCESS:
                draft.popularServiceLoading = false;
                draft.popularServiceDone = true;
                draft.popularService = action.popularService;
                break;
            case LOAD_POPULAR_SERVICE_FAILURE:
                draft.popularServiceLoading = false;
                draft.popularServiceError = action.error;
                break;
            case LOAD_TOTAL_SERVICE_REQUEST:
                draft.totalServiceLoading = true;
                draft.totalServiceDone = false;
                draft.totalServiceError = null;
                break;
            case LOAD_TOTAL_SERVICE_SUCCESS:
                draft.totalServiceLoading = false;
                draft.totalServiceDone = true;
                draft.totalService = draft.totalService.concat(action.totalService);
                draft.totalServiceCount = action.totalServiceCount;
                break;
            case LOAD_TOTAL_SERVICE_FAILURE:
                draft.totalServiceLoading = false;
                draft.totalServiceError = action.error;
                break;
            case LOAD_SEARCH_SERVICE_REQUEST:
                draft.searchServiceLoading = true;
                draft.searchServiceDone = false;
                draft.searchServiceError = null;
                break;
            case LOAD_SEARCH_SERVICE_SUCCESS: {
                draft.searchServiceLoading = false;
                draft.searchServiceDone = true;
                if (action.searchQuery.page === 1) {
                    draft.searchService = action.searchService;
                } else {
                    draft.searchService = draft.searchService.concat(action.searchService);
                }
                draft.searchServiceCount = action.searchServiceCount;
                draft.searchQuery = action.searchQuery;
                break;
            }
            case LOAD_SEARCH_SERVICE_FAILURE:
                draft.searchServiceLoading = false;
                draft.searchServiceError = action.error;
                break;
            case GET_SERVICE_INFO_REQUEST:
                draft.getSingleServiceLoading = true;
                draft.getSingleServiceDone = false;
                draft.getSingleServiceError = null;
                break;
            case GET_SERVICE_INFO_SUCCESS:
                console.log(action.payload);
                draft.getSingleServiceLoading = false;
                draft.getSingleServiceDone = true;
                draft.service = action.payload.service;
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
                draft.reviews = action.payload.reviews;
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
                draft.reviews = action.payload.reviews;
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
                console.log(action.payload);
                draft.reservationRequestDone = true;
                // draft.reservationRequests = action.payload.order;
                break;
            case CREATE_RESERVATION_FAILURE:
                draft.reservationRequestError = action.error;
                break;
            case GET_RESERVATION_INFO_REQUEST:
                draft.getReservationInfoDone = false;
                draft.getReservationInfo = null;
                draft.getReservationInfoError = null;
                break;
            case GET_RESERVATION_INFO_SUCCESS:
                console.log(action.payload);
                draft.getReservationInfoDone = true;
                draft.getReservationInfo = action.payload.order;
                break;
            case GET_RESERVATION_INFO_FAILURE:
                draft.getReservationInfoError = action.error;
                break;
            case RESERVATION_ACCEPT_REQUEST:
                draft.reservationAccepted = null;
                draft.reservationAcceptedError = null;
                break;
            case RESERVATION_ACCEPT_SUCCESS:
                console.log(action.payload);
                draft.reservationAcceptedDone = true;
                draft.reservationAccepted = action.payload.order;
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
            default:
                break;
        }
    });

export default reducer;

import {
    LOAD_ALL_SERVICES_REQUEST,
    LOAD_ALL_SERVICES_SUCCESS,
    LOAD_ALL_SERVICES_FAILURE,
    GET_SERVICE_INFO,
    GET_SERVICE_INFO_FAILURE,
    LOAD_FIRST_REVIEWS_REQUEST,
    LOAD_FIRST_REVIEWS_SUCCESS,
    LOAD_FIRST_REVIEWS_FAILURE,
    LOAD_MORE_REVIEWS_REQUEST,
    LOAD_MORE_REVIEWS_SUCCESS,
    LOAD_MORE_REVIEWS_FAILURE,
} from '../actions/service';
import Produce from '../util/produce';

// initial state
export const initialState = {
    services: [],
    service: null,
    reviews: [],
    loadAllServicesLoading: false,
    loadAllServicesDone: false,
    loadAllServicesError: null,
    getSingleServiceDone: false,
    getSingleServiceError: null,
    loadFirstReviewsLoading: false,
    loadFirstReviewsDone: false,
    loadFirstReviewsError: null,
    loadMoreReviewsLoading: false,
    loadMoreReviewsDone: false,
    loadMoreReviewsError: null,
    reservationRequest: [],
    reservationRequestError: null,
    reservationAccepted: [],
    reservationAcceptedError: null,
    reservationComplete: [],
    reservationCompleteError: null,
};

const reducer = (state = initialState, action) => {
    return Produce(state, (draft) => {
        switch (action.type) {
            case LOAD_ALL_SERVICES_REQUEST:
                draft.loadAllServicesLoading = true;
                draft.loadAllServicesDone = null;
                draft.loadAllServicesError = false;
                break;
            case LOAD_ALL_SERVICES_SUCCESS:
                draft.loadAllServicesLoading = false;
                draft.loadAllServicesDone = true;
                draft.services = action.payload;
                break;
            case LOAD_ALL_SERVICES_FAILURE:
                draft.loadAllServicesLoading = false;
                draft.loadAllServicesError = action.error;
                break;
            case GET_SERVICE_INFO:
                console.log(action.payload);
                draft.getSingleServiceDone = true;
                draft.getSingleServiceError = null;
                draft.service = action.payload.service;
                break;
            case GET_SERVICE_INFO_FAILURE:
                draft.getSingleServiceDone = false;
                draft.getSingleServiceError = action.error;
                break;
            case LOAD_FIRST_REVIEWS_REQUEST:
                draft.loadFirstReviewsLoading = true;
                draft.loadFirstReviewsDone = false;
                draft.loadFirstReviewsError = action.error;
                break;
            case LOAD_FIRST_REVIEWS_SUCCESS:
                draft.loadFirstReviewsLoading = false;
                draft.loadFirstReviewsDone = true;
                draft.reviews = action.payload;
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
                draft.reviews = action.payload;
                break;
            case LOAD_MORE_REVIEWS_FAILURE:
                draft.loadMoreReviewsLoading = false;
                draft.getSingleServiceError = action.error;
                break;
            default:
                break;
        }
    });
};

export default reducer;

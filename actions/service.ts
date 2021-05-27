import {
    GET_SERVICE_INFO_REQUEST,
    GET_SERVICE_INFO_SUCCESS,
    GET_SERVICE_INFO_FAILURE,
    LOAD_FIRST_REVIEWS_REQUEST,
    LOAD_FIRST_REVIEWS_SUCCESS,
    LOAD_FIRST_REVIEWS_FAILURE,
    LOAD_MORE_REVIEWS_REQUEST,
    LOAD_MORE_REVIEWS_SUCCESS,
    LOAD_MORE_REVIEWS_FAILURE,
    CREATE_RESERVATION_REQUEST,
    CREATE_RESERVATION_SUCCESS,
    CREATE_RESERVATION_FAILURE,
    GET_RESERVATION_INFO_REQUEST,
    GET_RESERVATION_INFO_SUCCESS,
    GET_RESERVATION_INFO_FAILURE,
    RESERVATION_ACCEPT_REQUEST,
    RESERVATION_ACCEPT_SUCCESS,
    RESERVATION_ACCEPT_FAILURE,
    RESERVATION_REJECT_REQUEST,
    RESERVATION_REJECT_SUCCESS,
    RESERVATION_REJECT_FAILURE,
    CHECK_OUT_REQUEST,
    CHECK_OUT_SUCCESS,
    LOAD_POPULAR_SERVICE_FAILURE,
    LOAD_POPULAR_SERVICE_REQUEST,
    LOAD_POPULAR_SERVICE_SUCCESS,
    LOAD_SEARCH_SERVICE_FAILURE,
    LOAD_SEARCH_SERVICE_REQUEST,
    LOAD_SEARCH_SERVICE_SUCCESS,
    LOAD_TOTAL_SERVICE_FAILURE,
    LOAD_TOTAL_SERVICE_REQUEST,
    LOAD_TOTAL_SERVICE_SUCCESS,
    CHECK_OUT_FAILURE,
    GET_ALL_RESERVATIONS_FAILURE,
    GET_ALL_RESERVATIONS_REQUEST,
    GET_ALL_RESERVATIONS_SUCCESS,
} from '../interfaces/act/service';
import { LongService, Review, ShortService, Order, Query } from '../interfaces/data/service';

export const loadPopularServicesRequest = () => ({
    type: LOAD_POPULAR_SERVICE_REQUEST,
});

export const loadPopularServicesSuccess = (popularServices: ShortService[]) => ({
    type: LOAD_POPULAR_SERVICE_SUCCESS,
    popularServices,
});

export const loadPopularServicesFailure = (error: string) => ({
    type: LOAD_POPULAR_SERVICE_FAILURE,
    error,
});

export const loadTotalServicesRequest = (page: number) => ({
    type: LOAD_TOTAL_SERVICE_REQUEST,
    page,
});

export const loadTotalServicesSuccess = (totalServices: ShortService[], totalServicesCount: number) => ({
    type: LOAD_TOTAL_SERVICE_SUCCESS,
    totalServices,
    totalServicesCount,
});

export const loadTotalServicesFailure = (error: string) => ({
    type: LOAD_TOTAL_SERVICE_FAILURE,
    error,
});

export const loadSearchServicesRequest = (query: Query) => ({
    type: LOAD_SEARCH_SERVICE_REQUEST,
    query,
});

export const loadSearchServicesSuccess = (
    searchServices: ShortService[],
    searchServicesCount: number,
    searchQuery: Query,
) => ({
    type: LOAD_SEARCH_SERVICE_SUCCESS,
    searchServices,
    searchServicesCount,
    searchQuery,
});

export const loadSearchServicesFailure = (error: string) => ({
    type: LOAD_SEARCH_SERVICE_FAILURE,
    error,
});

export const getServiceInfoRequest = (serviceId: string) => ({
    type: GET_SERVICE_INFO_REQUEST,
    serviceId,
});
export const getServiceInfoSuccess = (service: LongService) => ({
    type: GET_SERVICE_INFO_SUCCESS,
    service,
});
export const getServiceInfoFailure = (error: string) => ({
    type: GET_SERVICE_INFO_FAILURE,
    error,
});

export const loadFirstReviewRequest = (serviceId: string) => ({
    type: LOAD_FIRST_REVIEWS_REQUEST,
    serviceId,
});
export const loadFirstReviewSuccess = (reviews: Review[]) => ({
    type: LOAD_FIRST_REVIEWS_SUCCESS,
    reviews,
});
export const loadFirstReviewFailure = (error: string) => ({
    type: LOAD_FIRST_REVIEWS_FAILURE,
    error,
});

export const loadMoreReviewsRequest = (serviceId: string, page: number) => ({
    type: LOAD_MORE_REVIEWS_REQUEST,
    serviceId,
    page,
});
export const loadMoreReviewsSuccess = (reviews: Review[]) => ({
    type: LOAD_MORE_REVIEWS_SUCCESS,
    reviews,
});
export const loadMoreReviewsFailure = (error: string) => ({
    type: LOAD_MORE_REVIEWS_FAILURE,
    error,
});

export const createReservationRequest = (accessToken: string, data: Order) => ({
    type: CREATE_RESERVATION_REQUEST,
    accessToken,
    data,
});
export const createReservationSuccess = (order: Order) => ({
    type: CREATE_RESERVATION_SUCCESS,
    order,
});
export const createReservationFailure = (error: string) => ({
    type: CREATE_RESERVATION_FAILURE,
    error,
});

export const getAllReservationsRequest = (userId: string, accessToken: string) => ({
    type: GET_ALL_RESERVATIONS_REQUEST,
    userId,
    accessToken,
});
export const getAllReservationsSuccess = (orders: Order[]) => ({
    type: GET_ALL_RESERVATIONS_SUCCESS,
    orders,
});
export const getAllReservationsFailure = (error: string) => ({
    type: GET_ALL_RESERVATIONS_FAILURE,
    error,
});

export const getReservationInfoRequest = (orderId: string, accessToken: string) => ({
    type: GET_RESERVATION_INFO_REQUEST,
    orderId,
    accessToken,
});
export const getReservationInfoSuccess = (order: Order) => ({
    type: GET_RESERVATION_INFO_SUCCESS,
    order,
});
export const getReservationInfoFailure = (error: string) => ({
    type: GET_RESERVATION_INFO_FAILURE,
    error,
});

export const reservationAcceptRequest = (orderId: string, accessToken: string, state: string) => ({
    type: RESERVATION_ACCEPT_REQUEST,
    orderId,
    accessToken,
    state,
});
export const reservationAcceptSuccess = (order: Order) => ({
    type: RESERVATION_ACCEPT_SUCCESS,
    order,
});
export const reservationAcceptFailure = (error: string) => ({
    type: RESERVATION_ACCEPT_FAILURE,
    error,
});

export const reservationRejectRequest = (orderId: string, accessToken: string) => ({
    type: RESERVATION_REJECT_REQUEST,
    orderId,
    accessToken,
});
export const reservationRejectSuccess = (message: string) => ({
    type: RESERVATION_REJECT_SUCCESS,
    message,
});
export const reservationRejectFailure = (error: string) => ({
    type: RESERVATION_REJECT_FAILURE,
    error,
});

export const checkoutRequest = (orderId: string, impUid: string | string[], accessToken: string) => ({
    type: CHECK_OUT_REQUEST,
    orderId,
    impUid,
    accessToken,
});
export const checkoutSuccess = (status: string, message: string) => ({
    type: CHECK_OUT_SUCCESS,
    status,
    message,
});
export const checkoutFailure = (error: string) => ({
    type: CHECK_OUT_FAILURE,
    error,
});

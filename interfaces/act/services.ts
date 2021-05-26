import {
    getServiceInfoRequest,
    getServiceInfoSuccess,
    getServiceInfoFailure,
    loadFirstReviewRequest,
    loadFirstReviewSuccess,
    loadFirstReviewFailure,
    loadMoreReviewsRequest,
    loadMoreReviewsSuccess,
    loadMoreReviewsFailure,
    createReservationRequest,
    createReservationSuccess,
    createReservationFailure,
    getReservationInfoRequest,
    getReservationInfoSuccess,
    getReservationInfoFailure,
    reservationAcceptRequest,
    reservationAcceptSuccess,
    reservationAcceptFailure,
    reservationRejectRequest,
    reservationRejectSuccess,
    reservationRejectFailure,
    checkoutRequest,
    checkoutSuccess,
    checkoutFailure,
    getAllReservationsFailure,
    getAllReservationsRequest,
    getAllReservationsSuccess,
    loadSearchServiceFailure,
    loadSearchServiceRequest,
    loadSearchServiceSuccess,
    loadPopularServicesFailure,
    loadPopularServicesRequest,
    loadPopularServicesSuccess,
    loadTotalServicesFailure,
    loadTotalServicesRequest,
    loadTotalServicesSuccess,
} from '../../actions/service';

// 인기 서비스 요청
export const LOAD_POPULAR_SERVICE_REQUEST = 'LOAD_POPULAR_SERVICE_REQUEST' as const;
export const LOAD_POPULAR_SERVICE_SUCCESS = 'LOAD_POPULAR_SERVICE_SUCCESS' as const;
export const LOAD_POPULAR_SERVICE_FAILURE = 'LOAD_POPULAR_SERVICE_FAILURE' as const;

// 전체 서비스 요청
export const LOAD_TOTAL_SERVICE_REQUEST = 'LOAD_TOTAL_SERVICE_REQUEST' as const;
export const LOAD_TOTAL_SERVICE_SUCCESS = 'LOAD_TOTAL_SERVICE_SUCCESS' as const;
export const LOAD_TOTAL_SERVICE_FAILURE = 'LOAD_TOTAL_SERVICE_FAILURE' as const;

// 검색 서비스 요청
export const LOAD_SEARCH_SERVICE_REQUEST = 'LOAD_SEARCH_SERVICE_REQUEST' as const;
export const LOAD_SEARCH_SERVICE_SUCCESS = 'LOAD_SEARCH_SERVICE_SUCCESS' as const;
export const LOAD_SEARCH_SERVICE_FAILURE = 'LOAD_SEARCH_SERVICE_FAILURE' as const;

export const GET_SERVICE_INFO_REQUEST = 'GET_SERVICE_INFO_REQUEST' as const;
export const GET_SERVICE_INFO_SUCCESS = 'GET_SERVICE_INFO_SUCCESS' as const;
export const GET_SERVICE_INFO_FAILURE = 'GET_SERVICE_INFO_FAILURE' as const;

export const LOAD_FIRST_REVIEWS_REQUEST = 'LOAD_FIRST_REVIEWS_REQUEST' as const;
export const LOAD_FIRST_REVIEWS_SUCCESS = 'LOAD_FIRST_REVIEWS_SUCCESS' as const;
export const LOAD_FIRST_REVIEWS_FAILURE = 'LOAD_FIRST_REVIEWS_FAILURE' as const;

export const LOAD_MORE_REVIEWS_REQUEST = 'LOAD_MORE_REVIEWS_REQUEST' as const;
export const LOAD_MORE_REVIEWS_SUCCESS = 'LOAD_MORE_REVIEWS_SUCCESS' as const;
export const LOAD_MORE_REVIEWS_FAILURE = 'LOAD_MORE_REVIEWS_FAILURE' as const;

export const LOAD_ALL_SERVICES_REQUEST = 'LOAD_ALL_SERVICES_REQUEST' as const;
export const LOAD_ALL_SERVICES_SUCCESS = 'LOAD_ALL_SERVICES_SUCCESS' as const;
export const LOAD_ALL_SERVICES_FAILURE = 'LOAD_ALL_SERVICES_FAILURE' as const;

export const CREATE_RESERVATION_REQUEST = 'CREATE_RESERVATION_REQUEST' as const;
export const CREATE_RESERVATION_SUCCESS = 'CREATE_RESERVATION_SUCCESS' as const;
export const CREATE_RESERVATION_FAILURE = 'CREATE_RESERVATION_FAILURE' as const;

export const GET_ALL_RESERVATIONS_REQUEST = 'GET_ALL_RESERVATIONS_REQUEST' as const;
export const GET_ALL_RESERVATIONS_SUCCESS = 'GET_ALL_RESERVATIONS_SUCCESS' as const;
export const GET_ALL_RESERVATIONS_FAILURE = 'GET_ALL_RESERVATIONS_FAILURE' as const;

export const GET_RESERVATION_INFO_REQUEST = 'GET_RESERVATION_INFO_REQUEST' as const;
export const GET_RESERVATION_INFO_SUCCESS = 'GET_RESERVATION_INFO_SUCCESS' as const;
export const GET_RESERVATION_INFO_FAILURE = 'GET_RESERVATION_INFO_FAILURE' as const;

export const RESERVATION_ACCEPT_REQUEST = 'RESERVATION_ACCEPT_REQUEST' as const;
export const RESERVATION_ACCEPT_SUCCESS = 'RESERVATION_ACCEPT_SUCCESS' as const;
export const RESERVATION_ACCEPT_FAILURE = 'RESERVATION_ACCEPT_FAILURE' as const;

export const RESERVATION_REJECT_REQUEST = 'RESERVATION_REJECT_REQUEST' as const;
export const RESERVATION_REJECT_SUCCESS = 'RESERVATION_REJECT_SUCCESS' as const;
export const RESERVATION_REJECT_FAILURE = 'RESERVATION_REJECT_FAILURE' as const;

export const CHECK_OUT_REQUEST = 'CHECK_OUT_REQUEST' as const;
export const CHECK_OUT_SUCCESS = 'CHECK_OUT_SUCCESS' as const;
export const CHECK_OUT_FAILURE = 'CHECK_OUT_FAILURE' as const;

export type ActionRequest =
    | ReturnType<typeof loadPopularServicesRequest>
    | ReturnType<typeof loadPopularServicesSuccess>
    | ReturnType<typeof loadPopularServicesFailure>
    | ReturnType<typeof loadTotalServicesRequest>
    | ReturnType<typeof loadTotalServicesSuccess>
    | ReturnType<typeof loadTotalServicesFailure>
    | ReturnType<typeof loadSearchServiceRequest>
    | ReturnType<typeof loadSearchServiceSuccess>
    | ReturnType<typeof loadSearchServiceFailure>
    | ReturnType<typeof getServiceInfoRequest>
    | ReturnType<typeof getServiceInfoSuccess>
    | ReturnType<typeof getServiceInfoFailure>
    | ReturnType<typeof loadFirstReviewRequest>
    | ReturnType<typeof loadFirstReviewSuccess>
    | ReturnType<typeof loadFirstReviewFailure>
    | ReturnType<typeof loadMoreReviewsRequest>
    | ReturnType<typeof loadMoreReviewsSuccess>
    | ReturnType<typeof loadMoreReviewsFailure>
    | ReturnType<typeof createReservationRequest>
    | ReturnType<typeof createReservationSuccess>
    | ReturnType<typeof createReservationFailure>
    | ReturnType<typeof getAllReservationsRequest>
    | ReturnType<typeof getAllReservationsSuccess>
    | ReturnType<typeof getAllReservationsFailure>
    | ReturnType<typeof getReservationInfoRequest>
    | ReturnType<typeof getReservationInfoSuccess>
    | ReturnType<typeof getReservationInfoFailure>
    | ReturnType<typeof reservationAcceptRequest>
    | ReturnType<typeof reservationAcceptSuccess>
    | ReturnType<typeof reservationAcceptFailure>
    | ReturnType<typeof reservationRejectRequest>
    | ReturnType<typeof reservationRejectSuccess>
    | ReturnType<typeof reservationRejectFailure>
    | ReturnType<typeof checkoutRequest>
    | ReturnType<typeof checkoutSuccess>
    | ReturnType<typeof checkoutFailure>;

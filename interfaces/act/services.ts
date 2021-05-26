import {
    IGetServiceInfoRequest,
    IGetServiceInfoSuccess,
    IGetServiceInfoFailure,
    ILoadFirstReviewRequest,
    ILoadFirstReviewSuccess,
    ILoadFirstReviewFailure,
    ILoadMoreReviewsRequest,
    ILoadMoreReviewsSuccess,
    ILoadMoreReviewsFailure,
    ICreateReservationRequest,
    ICreateReservationSuccess,
    ICreateReservationFailure,
    IGetReservationInfoRequest,
    IGetReservationInfoSuccess,
    IGetReservationInfoFailure,
    IReservationAcceptRequest,
    IReservationAcceptSuccess,
    IReservationAcceptFailure,
    IReservationRejectRequest,
    IReservationRejectSuccess,
    IReservationRejectFailure,
    ICheckoutRequest,
    ICheckoutSuccess,
    ICheckoutFailure,
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
    | ReturnType<typeof IGetServiceInfoRequest>
    | ReturnType<typeof IGetServiceInfoSuccess>
    | ReturnType<typeof IGetServiceInfoFailure>
    | ReturnType<typeof ILoadFirstReviewRequest>
    | ReturnType<typeof ILoadFirstReviewSuccess>
    | ReturnType<typeof ILoadFirstReviewFailure>
    | ReturnType<typeof ILoadMoreReviewsRequest>
    | ReturnType<typeof ILoadMoreReviewsSuccess>
    | ReturnType<typeof ILoadMoreReviewsFailure>
    | ReturnType<typeof ICreateReservationRequest>
    | ReturnType<typeof ICreateReservationSuccess>
    | ReturnType<typeof ICreateReservationFailure>
    // | ReturnType<typeof IGetAllReservationsRequest>
    // | ReturnType<typeof IGetAllReservationsSuccess>
    // | ReturnType<typeof IGetAllReservationsFailure>
    | ReturnType<typeof IGetReservationInfoRequest>
    | ReturnType<typeof IGetReservationInfoSuccess>
    | ReturnType<typeof IGetReservationInfoFailure>
    | ReturnType<typeof IReservationAcceptRequest>
    | ReturnType<typeof IReservationAcceptSuccess>
    | ReturnType<typeof IReservationAcceptFailure>
    | ReturnType<typeof IReservationRejectRequest>
    | ReturnType<typeof IReservationRejectSuccess>
    | ReturnType<typeof IReservationRejectFailure>
    | ReturnType<typeof ICheckoutRequest>
    | ReturnType<typeof ICheckoutSuccess>
    | ReturnType<typeof ICheckoutFailure>;

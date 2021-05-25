import { LongService, Review, ShortService, Order } from '../data/service';

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
    // | ReturnType<typeof ILoadAllServicesRequest>
    // | ReturnType<typeof ILoadAllServicesSuccess>
    // | ReturnType<typeof ILoadAllServicesFailure>
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
    | ReturnType<typeof ICheckoutFailure>

export const IGetServiceInfoRequest = () => ({
    type: GET_SERVICE_INFO_REQUEST
})
export const IGetServiceInfoSuccess  = () => ({
    type: GET_SERVICE_INFO_SUCCESS,
    payload: { service: LongService }
})
export const IGetServiceInfoFailure = () => ({
    type: GET_SERVICE_INFO_FAILURE,
    error: Error
})

export const ILoadFirstReviewRequest = () => ({
    type: LOAD_FIRST_REVIEWS_REQUEST
})
export const ILoadFirstReviewSuccess  = () => ({
    type: LOAD_FIRST_REVIEWS_SUCCESS,
    payload: { reviews: Review[] | null }
})
export const ILoadFirstReviewFailure   = () => ({
    type: LOAD_FIRST_REVIEWS_FAILURE,
    error: Error
})

export const ILoadMoreReviewsRequest   = () => ({
    type: LOAD_MORE_REVIEWS_REQUEST
})
export const ILoadMoreReviewsSuccess  = () => ({
    type: LOAD_MORE_REVIEWS_SUCCESS,
    payload: { reviews: Review[] | null }
})
export const ILoadMoreReviewsFailure   = () => ({
    type: LOAD_MORE_REVIEWS_FAILURE,
    error: Error
})

// export const ILoadAllServicesRequest {
//     type: EActionTypesService.LOAD_ALL_SERVICES_REQUEST;
// }
// export const ILoadAllServicesSuccess {
//     type: EActionTypesService.LOAD_ALL_SERVICES_SUCCESS;
//     payload: {
//         services:
//             | [
//                   {
//                       service: ShortService[];
//                       popularService: ShortService[];
//                   },
//               ]
//             | [];
//     };
// }
// export const ILoadAllServicesFailure {
//     type: EActionTypesService.LOAD_ALL_SERVICES_FAILURE;
//     error: Error;
// }

export const ICreateReservationRequest = () => ({
    type: CREATE_RESERVATION_REQUEST
})
export const ICreateReservationSuccess = () => ({
    type: CREATE_RESERVATION_SUCCESS,
    payload: { order: Order | null }
})
export const ICreateReservationFailure = () => ({
    type: CREATE_RESERVATION_FAILURE,
    error: Error
})

// export const IGetAllReservationsRequest {
//     type: EActionTypesService.GET_ALL_RESERVATIONS_REQUEST;
// }
// export const IGetAllReservationsSuccess {
//     type: EActionTypesService.GET_ALL_RESERVATIONS_SUCCESS;
//     payload: { reservationRequests: Order[] | null };
// }
// export const IGetAllReservationsFailure {
//     type: EActionTypesService.GET_ALL_RESERVATIONS_FAILURE;
//     error: Error;
// }

export const IGetReservationInfoRequest = () => ({
    type: GET_RESERVATION_INFO_REQUEST
})
export const IGetReservationInfoSuccess = () => ({
    type: GET_RESERVATION_INFO_SUCCESS,
    payload: { order: Order | null }
})
export const IGetReservationInfoFailure = () => ({
    type: GET_RESERVATION_INFO_FAILURE,
    error: Error
})

export const IReservationAcceptRequest = () => ({
    type: RESERVATION_ACCEPT_REQUEST,
})
export const IReservationAcceptSuccess = () => ({
    type: RESERVATION_ACCEPT_SUCCESS,
    payload: { order: Order | null }
})
export const IReservationAcceptFailure = () => ({
    type: RESERVATION_ACCEPT_FAILURE,
    error: Error
})

export const IReservationRejectRequest = () => ({
    type: RESERVATION_REJECT_REQUEST
})
export const IReservationRejectSuccess = () => ({
    type: RESERVATION_REJECT_SUCCESS,
    payload: { message: string }
})
export const IReservationRejectFailure = () => ({
    type: RESERVATION_REJECT_FAILURE,
    error: Error
})

export const ICheckoutRequest = () => ({
    type: CHECK_OUT_REQUEST
})
export const ICheckoutSuccess = () => ({
    type: CHECK_OUT_SUCCESS,
    payload: { status: string; message: string }
})
export const ICheckoutFailure = () => ({
    type: .CHECK_OUT_FAILURE,
    error: Error
})

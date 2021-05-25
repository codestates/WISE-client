/* eslint-disable no-shadow */
import { LongService, Review, ShortService, Order } from '../data/service';

export enum EActionTypesService {
    GET_SERVICE_INFO_REQUEST = 'GET_SERVICE_INFO_REQUEST',
    GET_SERVICE_INFO_SUCCESS = 'GET_SERVICE_INFO_SUCCESS',
    GET_SERVICE_INFO_FAILURE = 'GET_SERVICE_INFO_FAILURE',

    LOAD_FIRST_REVIEWS_REQUEST = 'LOAD_FIRST_REVIEWS_REQUEST',
    LOAD_FIRST_REVIEWS_SUCCESS = 'LOAD_FIRST_REVIEWS_SUCCESS',
    LOAD_FIRST_REVIEWS_FAILURE = 'LOAD_FIRST_REVIEWS_FAILURE',

    LOAD_MORE_REVIEWS_REQUEST = 'LOAD_MORE_REVIEWS_REQUEST',
    LOAD_MORE_REVIEWS_SUCCESS = 'LOAD_MORE_REVIEWS_SUCCESS',
    LOAD_MORE_REVIEWS_FAILURE = 'LOAD_MORE_REVIEWS_FAILURE',

    LOAD_ALL_SERVICES_REQUEST = 'LOAD_ALL_SERVICES_REQUEST',
    LOAD_ALL_SERVICES_SUCCESS = 'LOAD_ALL_SERVICES_SUCCESS',
    LOAD_ALL_SERVICES_FAILURE = 'LOAD_ALL_SERVICES_FAILURE',

    CREATE_RESERVATION_REQUEST = 'CREATE_RESERVATION_REQUEST',
    CREATE_RESERVATION_SUCCESS = 'CREATE_RESERVATION_SUCCESS',
    CREATE_RESERVATION_FAILURE = 'CREATE_RESERVATION_FAILURE',

    GET_ALL_RESERVATIONS_REQUEST = 'GET_ALL_RESERVATIONS_REQUEST',
    GET_ALL_RESERVATIONS_SUCCESS = 'GET_ALL_RESERVATIONS_SUCCESS',
    GET_ALL_RESERVATIONS_FAILURE = 'GET_ALL_RESERVATIONS_FAILURE',

    GET_RESERVATION_INFO_REQUEST = 'GET_RESERVATION_INFO_REQUEST',
    GET_RESERVATION_INFO_SUCCESS = 'GET_RESERVATION_INFO_SUCCESS',
    GET_RESERVATION_INFO_FAILURE = 'GET_RESERVATION_INFO_FAILURE',

    RESERVATION_ACCEPT_REQUEST = 'RESERVATION_ACCEPT_REQUEST',
    RESERVATION_ACCEPT_SUCCESS = 'RESERVATION_ACCEPT_SUCCESS',
    RESERVATION_ACCEPT_FAILURE = 'RESERVATION_ACCEPT_FAILURE',

    RESERVATION_REJECT_REQUEST = 'RESERVATION_REJECT_REQUEST',
    RESERVATION_REJECT_SUCCESS = 'RESERVATION_REJECT_SUCCESS',
    RESERVATION_REJECT_FAILURE = 'RESERVATION_REJECT_FAILURE',

    CHECK_OUT_REQUEST = 'CHECK_OUT_REQUEST',
    CHECK_OUT_SUCCESS = 'CHECK_OUT_SUCCESS',
    CHECK_OUT_FAILURE = 'CHECK_OUT_FAILURE',
}

export type IActionsService =
    | IGetServiceInfoRequest
    | IGetServiceInfoSuccess
    | IGetServiceInfoFailure
    | ILoadFirstReviewRequest
    | ILoadFirstReviewSuccess
    | ILoadFirstReviewFailure
    | ILoadMoreReviewsRequest
    | ILoadMoreReviewsSuccess
    | ILoadMoreReviewsFailure
    // | ILoadAllServicesRequest
    // | ILoadAllServicesSuccess
    // | ILoadAllServicesFailure
    | ICreateReservationRequest
    | ICreateReservationSuccess
    | ICreateReservationFailure
    // | IGetAllReservationsRequest
    // | IGetAllReservationsSuccess
    // | IGetAllReservationsFailure
    | IGetReservationInfoRequest
    | IGetReservationInfoSuccess
    | IGetReservationInfoFailure
    | IReservationAcceptRequest
    | IReservationAcceptSuccess
    | IReservationAcceptFailure
    | IReservationRejectRequest
    | IReservationRejectSuccess
    | IReservationRejectFailure
    | ICheckoutRequest
    | ICheckoutSuccess
    | ICheckoutFailure;

export interface IGetServiceInfoRequest {
    type: EActionTypesService.GET_SERVICE_INFO_REQUEST;
}
export interface IGetServiceInfoSuccess {
    type: EActionTypesService.GET_SERVICE_INFO_SUCCESS;
    payload: { service: LongService };
}
export interface IGetServiceInfoFailure {
    type: EActionTypesService.GET_SERVICE_INFO_FAILURE;
    error: Error;
}

export interface ILoadFirstReviewRequest {
    type: EActionTypesService.LOAD_FIRST_REVIEWS_REQUEST;
}
export interface ILoadFirstReviewSuccess {
    type: EActionTypesService.LOAD_FIRST_REVIEWS_SUCCESS;
    payload: { reviews: Review[] | null };
}
export interface ILoadFirstReviewFailure {
    type: EActionTypesService.LOAD_FIRST_REVIEWS_FAILURE;
    error: Error;
}

export interface ILoadMoreReviewsRequest {
    type: EActionTypesService.LOAD_MORE_REVIEWS_REQUEST;
}
export interface ILoadMoreReviewsSuccess {
    type: EActionTypesService.LOAD_MORE_REVIEWS_SUCCESS;
    payload: { reviews: Review[] | null };
}
export interface ILoadMoreReviewsFailure {
    type: EActionTypesService.LOAD_MORE_REVIEWS_FAILURE;
    error: Error;
}

// export interface ILoadAllServicesRequest {
//     type: EActionTypesService.LOAD_ALL_SERVICES_REQUEST;
// }
// export interface ILoadAllServicesSuccess {
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
// export interface ILoadAllServicesFailure {
//     type: EActionTypesService.LOAD_ALL_SERVICES_FAILURE;
//     error: Error;
// }

export interface ICreateReservationRequest {
    type: EActionTypesService.CREATE_RESERVATION_REQUEST;
}
export interface ICreateReservationSuccess {
    type: EActionTypesService.CREATE_RESERVATION_SUCCESS;
    payload: { order: Order | null };
}
export interface ICreateReservationFailure {
    type: EActionTypesService.CREATE_RESERVATION_FAILURE;
    error: Error;
}

// export interface IGetAllReservationsRequest {
//     type: EActionTypesService.GET_ALL_RESERVATIONS_REQUEST;
// }
// export interface IGetAllReservationsSuccess {
//     type: EActionTypesService.GET_ALL_RESERVATIONS_SUCCESS;
//     payload: { reservationRequests: Order[] | null };
// }
// export interface IGetAllReservationsFailure {
//     type: EActionTypesService.GET_ALL_RESERVATIONS_FAILURE;
//     error: Error;
// }

export interface IGetReservationInfoRequest {
    type: EActionTypesService.GET_RESERVATION_INFO_REQUEST;
}
export interface IGetReservationInfoSuccess {
    type: EActionTypesService.GET_RESERVATION_INFO_SUCCESS;
    payload: { order: Order | null };
}
export interface IGetReservationInfoFailure {
    type: EActionTypesService.GET_RESERVATION_INFO_FAILURE;
    error: Error;
}

export interface IReservationAcceptRequest {
    type: EActionTypesService.RESERVATION_ACCEPT_REQUEST;
}
export interface IReservationAcceptSuccess {
    type: EActionTypesService.RESERVATION_ACCEPT_SUCCESS;
    payload: { order: Order | null };
}
export interface IReservationAcceptFailure {
    type: EActionTypesService.RESERVATION_ACCEPT_FAILURE;
    error: Error;
}

export interface IReservationRejectRequest {
    type: EActionTypesService.RESERVATION_REJECT_REQUEST;
}
export interface IReservationRejectSuccess {
    type: EActionTypesService.RESERVATION_REJECT_SUCCESS;
    payload: { message: string };
}
export interface IReservationRejectFailure {
    type: EActionTypesService.RESERVATION_REJECT_FAILURE;
    error: Error;
}

export interface ICheckoutRequest {
    type: EActionTypesService.CHECK_OUT_REQUEST;
}
export interface ICheckoutSuccess {
    type: EActionTypesService.CHECK_OUT_SUCCESS;
    payload: { status: string; message: string };
}
export interface ICheckoutFailure {
    type: EActionTypesService.CHECK_OUT_FAILURE;
    error: Error;
}

import { GET_SERVICE_INFO_REQUEST, GET_SERVICE_INFO_SUCCESS, GET_SERVICE_INFO_FAILURE, LOAD_FIRST_REVIEWS_REQUEST, LOAD_FIRST_REVIEWS_SUCCESS, LOAD_FIRST_REVIEWS_FAILURE, LOAD_MORE_REVIEWS_REQUEST, LOAD_MORE_REVIEWS_SUCCESS, LOAD_MORE_REVIEWS_FAILURE, CREATE_RESERVATION_REQUEST, CREATE_RESERVATION_SUCCESS, CREATE_RESERVATION_FAILURE, GET_RESERVATION_INFO_REQUEST, GET_RESERVATION_INFO_SUCCESS, GET_RESERVATION_INFO_FAILURE, RESERVATION_ACCEPT_REQUEST, RESERVATION_ACCEPT_SUCCESS, RESERVATION_ACCEPT_FAILURE, RESERVATION_REJECT_REQUEST, RESERVATION_REJECT_SUCCESS, RESERVATION_REJECT_FAILURE, CHECK_OUT_REQUEST, CHECK_OUT_SUCCESS, LOAD_POPULAR_SERVICE_FAILURE, LOAD_POPULAR_SERVICE_REQUEST, LOAD_POPULAR_SERVICE_SUCCESS, LOAD_SEARCH_SERVICE_FAILURE, LOAD_SEARCH_SERVICE_REQUEST, LOAD_SEARCH_SERVICE_SUCCESS, LOAD_TOTAL_SERVICE_FAILURE, LOAD_TOTAL_SERVICE_REQUEST, LOAD_TOTAL_SERVICE_SUCCESS } from '../interfaces/act/services';
import { LongService, Review, ShortService, Order, Query } from '../interfaces/data/service';

export const loadPopularServiceRequest = () => ({
    type: LOAD_POPULAR_SERVICE_REQUEST,
});

export const loadPopularServiceSuccess = (popularService: ShortService) => ({
    type: LOAD_POPULAR_SERVICE_SUCCESS,
    popularService,
});

export const loadPopularServiceFailure = (error: string) => ({
    type: LOAD_POPULAR_SERVICE_FAILURE,
    error,
});

export const loadTotalServiceRequest = (page = 1) => ({
    type: LOAD_TOTAL_SERVICE_REQUEST,
    page,
});

export const loadTotalServiceSuccess = (totalService: ShortService[], totalServiceCount: number) => ({
    type: LOAD_TOTAL_SERVICE_SUCCESS,
    totalService,
    totalServiceCount,
});

export const loadTotalServiceFailure = (error: string) => ({
    type: LOAD_TOTAL_SERVICE_FAILURE,
    error,
});

export const loadSearchServiceRequest = (query: Query) => ({
    type: LOAD_SEARCH_SERVICE_REQUEST,
    query,
});

export const loadSearchServiceSuccess = (
    searchService: ShortService[],
    searchServiceCount: number,
    searchQuery: Query,
) => ({
    type: LOAD_SEARCH_SERVICE_SUCCESS,
    searchService,
    searchServiceCount,
    searchQuery,
});

export const loadSearchServiceFailure = (error: string) => ({
    type: LOAD_SEARCH_SERVICE_FAILURE,
    error,
});

// TODO:

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

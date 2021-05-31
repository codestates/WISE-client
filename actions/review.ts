import { Review } from '../interfaces/data/review';

export const LOAD_FIRST_REVIEWS_REQUEST = 'LOAD_FIRST_REVIEWS_REQUEST' as const;
export const LOAD_FIRST_REVIEWS_SUCCESS = 'LOAD_FIRST_REVIEWS_SUCCESS' as const;
export const LOAD_FIRST_REVIEWS_FAILURE = 'LOAD_FIRST_REVIEWS_FAILURE' as const;

export const LOAD_MORE_REVIEWS_REQUEST = 'LOAD_MORE_REVIEWS_REQUEST' as const;
export const LOAD_MORE_REVIEWS_SUCCESS = 'LOAD_MORE_REVIEWS_SUCCESS' as const;
export const LOAD_MORE_REVIEWS_FAILURE = 'LOAD_MORE_REVIEWS_FAILURE' as const;

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

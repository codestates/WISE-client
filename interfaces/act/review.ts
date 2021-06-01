import {
    loadFirstReviewRequest,
    loadFirstReviewSuccess,
    loadFirstReviewFailure,
    loadMoreReviewsRequest,
    loadMoreReviewsSuccess,
    loadMoreReviewsFailure,
    addReviewFailure,
    addReviewRequest,
    addReviewSuccess,
} from '../../actions/review';

export type ReviewAction =
    | ReturnType<typeof loadFirstReviewRequest>
    | ReturnType<typeof loadFirstReviewSuccess>
    | ReturnType<typeof loadFirstReviewFailure>
    | ReturnType<typeof loadMoreReviewsRequest>
    | ReturnType<typeof loadMoreReviewsSuccess>
    | ReturnType<typeof loadMoreReviewsFailure>
    | ReturnType<typeof addReviewRequest>
    | ReturnType<typeof addReviewSuccess>
    | ReturnType<typeof addReviewFailure>;

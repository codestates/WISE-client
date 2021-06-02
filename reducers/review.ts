/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import produce from 'immer';
import {
    LOAD_FIRST_REVIEWS_REQUEST,
    LOAD_FIRST_REVIEWS_SUCCESS,
    LOAD_FIRST_REVIEWS_FAILURE,
    LOAD_MORE_REVIEWS_REQUEST,
    LOAD_MORE_REVIEWS_SUCCESS,
    LOAD_MORE_REVIEWS_FAILURE,
    ADD_REVIEW_FAILURE,
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_SUCCESS,
} from '../actions/review';
import { ReviewAction } from '../interfaces/act/review';
import { ReviewState } from '../interfaces/data/review';

/* ------- initial state ------ */
export const initialState: ReviewState = {
    reviews: null,
    totalReviews: 0,
    loadFirstReviewsLoading: false,
    loadFirstReviewsDone: false,
    loadFirstReviewsError: null,
    loadMoreReviewsLoading: false,
    loadMoreReviewsDone: false,
    loadMoreReviewsError: null,
    addReviewLoading: false,
    addReviewDone: false,
    addReviewError: null,
    review: null,
};

/* ------- reducer ------ */
const reducer = (state = initialState, action: ReviewAction) =>
    produce(state, (draft: ReviewState) => {
        switch (action.type) {
            case LOAD_FIRST_REVIEWS_REQUEST:
                draft.loadFirstReviewsLoading = true;
                draft.loadFirstReviewsDone = false;
                draft.loadFirstReviewsError = null;
                break;
            case LOAD_FIRST_REVIEWS_SUCCESS:
                draft.loadFirstReviewsLoading = false;
                draft.loadFirstReviewsDone = true;
                draft.reviews = [...action.reviews];
                draft.totalReviews = action.totalReviews;
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
                draft.reviews = [...action.reviews];
                draft.totalReviews = action.totalReviews;
                break;
            case LOAD_MORE_REVIEWS_FAILURE:
                draft.loadMoreReviewsLoading = false;
                draft.loadMoreReviewsError = action.error;
                break;
            case ADD_REVIEW_REQUEST:
                draft.addReviewLoading = true;
                draft.addReviewDone = false;
                draft.addReviewError = null;
                break;
            case ADD_REVIEW_SUCCESS:
                draft.addReviewLoading = false;
                draft.addReviewDone = true;
                draft.review = action.review;
                break;
            case ADD_REVIEW_FAILURE:
                draft.addReviewLoading = false;
                draft.addReviewError = action.error;
                break;
            default:
                break;
        }
    });

export default reducer;

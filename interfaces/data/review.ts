export interface Review {
    _id: string;
    customer: {
        id: string;
        name: string;
        image: string;
    };
    service: string;
    content: string;
    starRating: number;
    createdAt: Date;
}

export type ReviewState = {
    reviews: Review[] | null;
    totalReviews: number;
    loadFirstReviewsLoading: boolean;
    loadFirstReviewsDone: boolean;
    loadFirstReviewsError: null | string;
    loadMoreReviewsLoading: boolean;
    loadMoreReviewsDone: boolean;
    loadMoreReviewsError: null | string;
    addReviewLoading: boolean;
    addReviewDone: boolean;
    addReviewError: null | string;
    review: Review | null;
};

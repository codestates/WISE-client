export interface ShortService {
    id: string;
    images: string[];
    assistant: {
        id: string;
        name: string;
    };
    wage: number;
    greetings: string;
    location: string;
    starRating: number;
}

export interface LongService {
    id: string;
    assistant: string;
    description: string;
    wage: number;
    availableDays: string[];
    greetings: string;
    isDriver: boolean;
    location: string;
    images: string[];
    isTrained: boolean;
    trainingCert: string[];
    isAuthorized: boolean;
    orgAuth: string[];
    starRating: number;
}

export interface Order {
    id: string;
    customer: { id: string; name: string };
    assistant: { id: string; name: string };
    service: string;
    pickup: string;
    content: string;
    hospital: string;
    message: string;
    date: Date;
    time: string;
    hours: number;
    totalPayment: number;
    state: string;
}

export interface Review {
    id: string;
    content: string;
    writtenBy: string;
    service: string;
    createdAt: Date;
}

export interface Query {
    location: string;
    date: string;
    time: string;
    page: number;
}

export type ServiceState = {
    popularService: ShortService[] | [];
    totalService: ShortService[] | [];
    totalServiceCount: number;
    searchService: ShortService[] | [];
    searchServiceCount: number;
    searchQuery: Query | null;
    service: LongService | null;
    reviews: Review[] | null;
    popularServiceLoading: boolean;
    popularServiceDone: boolean;
    popularServiceError: null | string;
    totalServiceLoading: boolean;
    totalServiceDone: boolean;
    totalServiceError: null | string;
    searchServiceLoading: boolean;
    searchServiceDone: boolean;
    searchServiceError: null | string;
    getSingleServiceLoading: boolean;
    getSingleServiceDone: boolean;
    getSingleServiceError: null | string;
    loadFirstReviewsLoading: boolean;
    loadFirstReviewsDone: boolean;
    loadFirstReviewsError: null | string;
    loadMoreReviewsLoading: boolean;
    loadMoreReviewsDone: boolean;
    loadMoreReviewsError: null | string;
    reservationRequestDone: boolean;
    reservationRequestError: null | string;
    getAllReservationsDone: boolean;
    reservationRequests: Order[] | null;
    getAllReservationsError: null | string;
    getReservationInfoDone: boolean;
    getReservationInfo: Order | null;
    getReservationInfoError: null | string;
    reservationAcceptedDone: boolean;
    reservationAccepted: Order | null;
    reservationAcceptedError: null | string;
    reservationRejectedDone: boolean;
    reservationRejectedError: null | string;
    checkoutDone: boolean;
    checkoutStatus: null | string;
    checkoutError: null | string;
};

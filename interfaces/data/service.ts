export interface ShortService {
    _id: string;
    images: string[];
    assistant: {
        _id: string;
        name: string;
    };
    wage: number;
    greetings: string;
    location: string;
    starRating: number;
}

export interface LongService {
    _id: string;
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
    _id: string;
    customer: { _id: string; name: string; mobile: string };
    assistant: { _id: string; name: string; mobile?: string };
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
    _id: string;
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
    popularServices: ShortService[] | [];
    totalServices: ShortService[] | [];
    totalServicesCount: number;
    searchServices: ShortService[] | [];
    searchServicesCount: number;
    searchQuery: Query | null;
    service: LongService | null;
    reviews: Review[] | null;
    popularServicesLoading: boolean;
    popularServicesDone: boolean;
    popularServicesError: null | string;
    totalServicesLoading: boolean;
    totalServicesDone: boolean;
    totalServicesError: null | string;
    searchServicesLoading: boolean;
    searchServicesDone: boolean;
    searchServicesError: null | string;
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
    notifications: null | string[];
};

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

export type ServiceState = {
    services:
        | [
              {
                  service: ShortService[];
                  popularService: ShortService[];
              },
          ]
        | [];
    service: LongService | null;
    reviews: Review[] | null;
    loadAllServicesLoading: boolean;
    loadAllServicesDone: boolean;
    loadAllServicesError: null | Error;
    getSingleServiceLoading: boolean;
    getSingleServiceDone: boolean;
    getSingleServiceError: null | Error;
    loadFirstReviewsLoading: boolean;
    loadFirstReviewsDone: boolean;
    loadFirstReviewsError: null | Error;
    loadMoreReviewsLoading: boolean;
    loadMoreReviewsDone: boolean;
    loadMoreReviewsError: null | Error;
    reservationRequests: Order[] | null;
    reservationRequestDone: boolean;
    reservationRequestError: null | Error;
    getReservationInfoDone: boolean;
    // TODO: 하나의 예약정보만 가져오는 api가 만들어지면 채워넣기
    getReservationInfo: Order | null;
    getReservationInfoError: null | Error;
    reservationAcceptedDone: boolean;
    reservationAccepted: Order | null;
    reservationAcceptedError: null | Error;
    reservationRejectedDone: boolean;
    reservationRejectedError: null | Error;
    // TODO: 결제 및 매칭이 성공하는 api가 만들어지면 채워넣기
    reservationComplete: null;
    reservationCompleteError: null | Error;
};

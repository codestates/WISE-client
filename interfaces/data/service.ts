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

export interface Service extends ShortService {
    description: string;
    availableDays: string[];
    isDriver: boolean;
    isTrained: boolean;
    trainingCert: string[];
    isAuthorized: boolean;
    orgAuth: string[];
}

export interface Query {
    location: string;
    date: string;
    time: string;
    page: number;
}

export interface Schedule {
    availableDays: string[];
    orders: string[];
}

export type ServiceState = {
    myService: Service | null;
    service: Service | null;
    popularServices: ShortService[] | [];
    totalServices: ShortService[] | [];
    totalServicesCount: number;
    searchServices: ShortService[] | [];
    searchServicesCount: number;
    searchQuery: Query | null;
    serviceSchedule: Schedule | null;
    addServiceLoading: boolean;
    addServiceDone: boolean;
    addServiceError: null | string;
    loadServiceLoading: boolean;
    loadServiceDone: boolean;
    loadServiceError: null | string;
    changeServiceLoading: boolean;
    changeServiceDone: boolean;
    changeServiceError: null | string;
    removeServiceLoading: boolean;
    removeServiceDone: boolean;
    removeServiceError: null | string;
    loadPopularServicesLoading: boolean;
    loadPopularServicesDone: boolean;
    loadPopularServicesError: null | string;
    loadTotalServicesLoading: boolean;
    loadTotalServicesDone: boolean;
    loadTotalServicesError: null | string;
    loadSearchServicesLoading: boolean;
    loadSearchServicesDone: boolean;
    loadSearchServicesError: null | string;
    loadServiceInfoLoading: boolean;
    loadServiceInfoDone: boolean;
    loadServiceInfoError: null | string;
};

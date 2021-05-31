import { Service, ShortService, Query } from '../interfaces/data/service';

// 서비스 등록
export const ADD_SERVICE_REQUEST = 'ADD_SERVICE_REQUEST' as const;
export const ADD_SERVICE_SUCCESS = 'ADD_SERVICE_SUCCESS' as const;
export const ADD_SERVICE_FAILURE = 'ADD_SERVICE_FAILURE' as const;

// 서비스 조희
export const LOAD_SERVICE_REQUEST = 'LOAD_SERVICE_REQUEST' as const;
export const LOAD_SERVICE_SUCCESS = 'LOAD_SERVICE_SUCCESS' as const;
export const LOAD_SERVICE_FAILURE = 'LOAD_SERVICE_FAILURE' as const;

// 서비스 수정
export const CHANGE_SERVICE_REQUEST = 'CHANGE_SERVICE_REQUEST' as const;
export const CHANGE_SERVICE_SUCCESS = 'CHANGE_SERVICE_SUCCESS' as const;
export const CHANGE_SERVICE_FAILURE = 'CHANGE_SERVICE_FAILURE' as const;

// 서비스 삭제
export const REMOVE_SERVICE_REQUEST = 'REMOVE_SERVICE_REQUEST' as const;
export const REMOVE_SERVICE_SUCCESS = 'REMOVE_SERVICE_SUCCESS' as const;
export const REMOVE_SERVICE_FAILURE = 'REMOVE_SERVICE_FAILURE' as const;

// 인기 서비스 조희
export const LOAD_POPULAR_SERVICES_REQUEST = 'LOAD_POPULAR_SERVICES_REQUEST' as const;
export const LOAD_POPULAR_SERVICES_SUCCESS = 'LOAD_POPULAR_SERVICES_SUCCESS' as const;
export const LOAD_POPULAR_SERVICES_FAILURE = 'LOAD_POPULAR_SERVICES_FAILURE' as const;

// 전체 서비스 조희
export const LOAD_TOTAL_SERVICES_REQUEST = 'LOAD_TOTAL_SERVICES_REQUEST' as const;
export const LOAD_TOTAL_SERVICES_SUCCESS = 'LOAD_TOTAL_SERVICES_SUCCESS' as const;
export const LOAD_TOTAL_SERVICES_FAILURE = 'LOAD_TOTAL_SERVICES_FAILURE' as const;

// 검색 서비스 조희
export const LOAD_SEARCH_SERVICES_REQUEST = 'LOAD_SEARCH_SERVICES_REQUEST' as const;
export const LOAD_SEARCH_SERVICES_SUCCESS = 'LOAD_SEARCH_SERVICES_SUCCESS' as const;
export const LOAD_SEARCH_SERVICES_FAILURE = 'LOAD_SEARCH_SERVICES_FAILURE' as const;

// 서비스 상세 조희 ?
export const LOAD_SERVICE_INFO_REQUEST = 'LOAD_SERVICE_INFO_REQUEST' as const;
export const LOAD_SERVICE_INFO_SUCCESS = 'LOAD_SERVICE_INFO_SUCCESS' as const;
export const LOAD_SERVICE_INFO_FAILURE = 'LOAD_SERVICE_INFO_FAILURE' as const;

export const LOAD_SERVICE_SCHEDULE = 'LOAD_SERVICE_SCHEDULE' as const;

// 서비스 등록
export const addServiceRequest = (data: FormData, accessToken: string) => ({
    type: ADD_SERVICE_REQUEST,
    data,
    accessToken,
});

export const addServiceSuccess = (myService: Service) => ({
    type: ADD_SERVICE_SUCCESS,
    myService,
});

export const addServiceFailure = (error: string) => ({
    type: ADD_SERVICE_FAILURE,
    error,
});

// 서비스 조회
export const loadServiceRequest = (serviceId: string) => ({
    type: LOAD_SERVICE_REQUEST,
    serviceId,
});
export const loadServiceSuccess = (myService: Service) => ({
    type: LOAD_SERVICE_SUCCESS,
    myService,
});
export const loadServiceFailure = (error: string) => ({
    type: LOAD_SERVICE_FAILURE,
    error,
});

// 서비스 수정
export const changeServiceRequest = (serviceId: string, accessToken: string, data: FormData) => ({
    type: CHANGE_SERVICE_REQUEST,
    serviceId,
    accessToken,
    data,
});

export const changeServiceSuccess = (myService: Service) => ({
    type: CHANGE_SERVICE_SUCCESS,
    myService,
});

export const changeServiceFailure = (error: string) => ({
    type: CHANGE_SERVICE_FAILURE,
    error,
});

// 서비스 삭제
export const removeServiceRequest = (serviceId: string) => ({
    type: REMOVE_SERVICE_REQUEST,
    serviceId,
});

export const removeServiceSuccess = () => ({
    type: REMOVE_SERVICE_SUCCESS,
});

export const removeServiceFailure = (error: string) => ({
    type: REMOVE_SERVICE_FAILURE,
    error,
});

// 인기 서비스 조희
export const loadPopularServicesRequest = () => ({
    type: LOAD_POPULAR_SERVICES_REQUEST,
});

export const loadPopularServicesSuccess = (popularServices: ShortService[]) => ({
    type: LOAD_POPULAR_SERVICES_SUCCESS,
    popularServices,
});

export const loadPopularServicesFailure = (error: string) => ({
    type: LOAD_POPULAR_SERVICES_FAILURE,
    error,
});

// 전체 서비스 조희
export const loadTotalServicesRequest = (page: number) => ({
    type: LOAD_TOTAL_SERVICES_REQUEST,
    page,
});

export const loadTotalServicesSuccess = (totalServices: ShortService[], totalServicesCount: number) => ({
    type: LOAD_TOTAL_SERVICES_SUCCESS,
    totalServices,
    totalServicesCount,
});

export const loadTotalServicesFailure = (error: string) => ({
    type: LOAD_TOTAL_SERVICES_FAILURE,
    error,
});

// 검색 서비스 조희
export const loadSearchServicesRequest = (query: Query) => ({
    type: LOAD_SEARCH_SERVICES_REQUEST,
    query,
});

export const loadSearchServicesSuccess = (
    searchServices: ShortService[],
    searchServicesCount: number,
    searchQuery: Query,
) => ({
    type: LOAD_SEARCH_SERVICES_SUCCESS,
    searchServices,
    searchServicesCount,
    searchQuery,
});

export const loadSearchServicesFailure = (error: string) => ({
    type: LOAD_SEARCH_SERVICES_FAILURE,
    error,
});

// 서비스 상세 조희 ?
export const loadServiceInfoRequest = (serviceId: string) => ({
    type: LOAD_SERVICE_INFO_REQUEST,
    serviceId,
});
export const loadServiceInfoSuccess = (service: Service) => ({
    type: LOAD_SERVICE_INFO_SUCCESS,
    service,
});
export const loadServiceInfoFailure = (error: string) => ({
    type: LOAD_SERVICE_INFO_FAILURE,
    error,
});

export const loadServiceSchedule = (schedule: any) => ({
    type: LOAD_SERVICE_SCHEDULE,
    schedule,
});

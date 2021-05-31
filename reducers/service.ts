/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
    ADD_SERVICE_FAILURE,
    ADD_SERVICE_REQUEST,
    ADD_SERVICE_SUCCESS,
    CHANGE_SERVICE_FAILURE,
    CHANGE_SERVICE_REQUEST,
    CHANGE_SERVICE_SUCCESS,
    LOAD_POPULAR_SERVICES_FAILURE,
    LOAD_POPULAR_SERVICES_REQUEST,
    LOAD_POPULAR_SERVICES_SUCCESS,
    LOAD_SEARCH_SERVICES_FAILURE,
    LOAD_SEARCH_SERVICES_REQUEST,
    LOAD_SEARCH_SERVICES_SUCCESS,
    LOAD_SERVICE_FAILURE,
    LOAD_SERVICE_INFO_FAILURE,
    LOAD_SERVICE_INFO_REQUEST,
    LOAD_SERVICE_INFO_SUCCESS,
    LOAD_SERVICE_REQUEST,
    LOAD_SERVICE_SCHEDULE,
    LOAD_SERVICE_SUCCESS,
    LOAD_TOTAL_SERVICES_FAILURE,
    LOAD_TOTAL_SERVICES_REQUEST,
    LOAD_TOTAL_SERVICES_SUCCESS,
    REMOVE_SERVICE_FAILURE,
    REMOVE_SERVICE_REQUEST,
    REMOVE_SERVICE_SUCCESS,
} from '../actions/service';
import { ServiceAction } from '../interfaces/act/service';
import { ServiceState, ShortService } from '../interfaces/data/service';

/* ------- initial state ------ */
export const initialState: ServiceState = {
    myService: null,
    service: null,
    popularServices: [],
    totalServices: [],
    totalServicesCount: 0,
    searchServices: [],
    searchServicesCount: 0,
    searchQuery: null,
    serviceSchedule: null,
    addServiceLoading: false,
    addServiceDone: false,
    addServiceError: null,
    loadServiceLoading: false,
    loadServiceDone: false,
    loadServiceError: null,
    changeServiceLoading: false,
    changeServiceDone: false,
    changeServiceError: null,
    removeServiceLoading: false,
    removeServiceDone: false,
    removeServiceError: null,
    loadPopularServicesLoading: false,
    loadPopularServicesDone: false,
    loadPopularServicesError: null,
    loadTotalServicesLoading: false,
    loadTotalServicesDone: false,
    loadTotalServicesError: null,
    loadSearchServicesLoading: false,
    loadSearchServicesDone: false,
    loadSearchServicesError: null,
    loadServiceInfoLoading: false,
    loadServiceInfoDone: false,
    loadServiceInfoError: null,
};

/* ------- reducer ------ */
const reducer = (state = initialState, action: ServiceAction) =>
    produce(state, (draft: ServiceState) => {
        switch (action.type) {
            case ADD_SERVICE_REQUEST:
                draft.addServiceLoading = true;
                draft.addServiceDone = false;
                draft.addServiceError = null;
                break;
            case ADD_SERVICE_SUCCESS:
                draft.addServiceLoading = false;
                draft.addServiceDone = true;
                draft.myService = action.myService;
                break;
            case ADD_SERVICE_FAILURE:
                draft.addServiceLoading = false;
                draft.addServiceError = action.error;
                break;
            case LOAD_SERVICE_REQUEST:
                draft.loadServiceLoading = true;
                draft.loadServiceDone = false;
                draft.loadServiceError = null;
                break;
            case LOAD_SERVICE_SUCCESS:
                draft.loadServiceLoading = false;
                draft.loadServiceDone = true;
                draft.myService = action.myService;
                break;
            case LOAD_SERVICE_FAILURE:
                draft.loadServiceLoading = false;
                draft.loadServiceError = action.error;
                break;
            case CHANGE_SERVICE_REQUEST:
                draft.changeServiceLoading = true;
                draft.changeServiceDone = false;
                draft.changeServiceError = null;
                break;
            case CHANGE_SERVICE_SUCCESS:
                draft.changeServiceLoading = false;
                draft.changeServiceDone = true;
                draft.myService = action.myService;
                break;
            case CHANGE_SERVICE_FAILURE:
                draft.changeServiceLoading = false;
                draft.changeServiceError = action.error;
                break;
            case REMOVE_SERVICE_REQUEST:
                draft.removeServiceLoading = true;
                draft.removeServiceDone = false;
                draft.removeServiceError = null;
                break;
            case REMOVE_SERVICE_SUCCESS:
                draft.removeServiceLoading = false;
                draft.removeServiceDone = true;
                draft.myService = null;
                break;
            case REMOVE_SERVICE_FAILURE:
                draft.removeServiceLoading = false;
                draft.removeServiceError = action.error;
                break;
            case LOAD_POPULAR_SERVICES_REQUEST:
                draft.loadPopularServicesLoading = true;
                draft.loadPopularServicesDone = false;
                draft.loadPopularServicesError = null;
                break;
            case LOAD_POPULAR_SERVICES_SUCCESS:
                draft.loadPopularServicesLoading = false;
                draft.loadPopularServicesDone = true;
                draft.popularServices = action.popularServices;
                break;
            case LOAD_POPULAR_SERVICES_FAILURE:
                draft.loadPopularServicesLoading = false;
                draft.loadPopularServicesError = action.error;
                break;
            case LOAD_TOTAL_SERVICES_REQUEST:
                draft.loadTotalServicesLoading = true;
                draft.loadTotalServicesDone = false;
                draft.loadTotalServicesError = null;
                break;
            case LOAD_TOTAL_SERVICES_SUCCESS:
                draft.loadTotalServicesLoading = false;
                draft.loadTotalServicesDone = true;
                draft.totalServices = (draft.totalServices as ShortService[]).concat(action.totalServices);
                draft.totalServicesCount = action.totalServicesCount;
                break;
            case LOAD_TOTAL_SERVICES_FAILURE:
                draft.loadTotalServicesLoading = false;
                draft.loadTotalServicesError = action.error;
                break;
            case LOAD_SEARCH_SERVICES_REQUEST:
                draft.loadSearchServicesLoading = true;
                draft.loadSearchServicesDone = false;
                draft.loadSearchServicesError = null;
                break;
            case LOAD_SEARCH_SERVICES_SUCCESS: {
                draft.loadSearchServicesLoading = false;
                draft.loadSearchServicesDone = true;
                if (action.searchQuery.page === 1) {
                    draft.searchServices = action.searchServices;
                } else {
                    draft.searchServices = (draft.searchServices as ShortService[]).concat(action.searchServices);
                }
                draft.searchServicesCount = action.searchServicesCount;
                draft.searchQuery = action.searchQuery;
                break;
            }
            case LOAD_SEARCH_SERVICES_FAILURE:
                draft.loadSearchServicesLoading = false;
                draft.loadSearchServicesError = action.error;
                break;
            case LOAD_SERVICE_INFO_REQUEST:
                draft.loadServiceInfoLoading = true;
                draft.loadServiceInfoDone = false;
                draft.loadServiceInfoError = null;
                break;
            case LOAD_SERVICE_INFO_SUCCESS:
                draft.loadServiceInfoLoading = false;
                draft.loadServiceInfoDone = true;
                draft.service = action.service;
                break;
            case LOAD_SERVICE_INFO_FAILURE:
                draft.loadServiceInfoLoading = false;
                draft.loadServiceInfoError = action.error;
                break;
            case LOAD_SERVICE_SCHEDULE:
                draft.serviceSchedule = action.schedule;
                break;
            default:
                break;
        }
    });

export default reducer;

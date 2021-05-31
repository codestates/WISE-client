import {
    loadSearchServicesFailure,
    loadSearchServicesRequest,
    loadSearchServicesSuccess,
    loadPopularServicesFailure,
    loadPopularServicesRequest,
    loadPopularServicesSuccess,
    loadTotalServicesFailure,
    loadTotalServicesRequest,
    loadTotalServicesSuccess,
    addServiceFailure,
    addServiceRequest,
    addServiceSuccess,
    changeServiceFailure,
    changeServiceRequest,
    changeServiceSuccess,
    loadServiceFailure,
    loadServiceRequest,
    loadServiceSuccess,
    removeServiceFailure,
    removeServiceRequest,
    removeServiceSuccess,
    loadServiceInfoRequest,
    loadServiceInfoSuccess,
    loadServiceInfoFailure,
    loadServiceSchedule,
} from '../../actions/service';

export type ServiceAction =
    | ReturnType<typeof addServiceRequest>
    | ReturnType<typeof addServiceSuccess>
    | ReturnType<typeof addServiceFailure>
    | ReturnType<typeof loadServiceRequest>
    | ReturnType<typeof loadServiceSuccess>
    | ReturnType<typeof loadServiceFailure>
    | ReturnType<typeof changeServiceRequest>
    | ReturnType<typeof changeServiceSuccess>
    | ReturnType<typeof changeServiceFailure>
    | ReturnType<typeof removeServiceRequest>
    | ReturnType<typeof removeServiceSuccess>
    | ReturnType<typeof removeServiceFailure>
    | ReturnType<typeof loadPopularServicesRequest>
    | ReturnType<typeof loadPopularServicesSuccess>
    | ReturnType<typeof loadPopularServicesFailure>
    | ReturnType<typeof loadTotalServicesRequest>
    | ReturnType<typeof loadTotalServicesSuccess>
    | ReturnType<typeof loadTotalServicesFailure>
    | ReturnType<typeof loadSearchServicesRequest>
    | ReturnType<typeof loadSearchServicesSuccess>
    | ReturnType<typeof loadSearchServicesFailure>
    | ReturnType<typeof loadServiceInfoRequest>
    | ReturnType<typeof loadServiceInfoSuccess>
    | ReturnType<typeof loadServiceInfoFailure>
    | ReturnType<typeof loadServiceSchedule>;

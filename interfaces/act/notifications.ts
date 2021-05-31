import {
    loadNotificationsRequest,
    loadNotificationsSuccess,
    loadNotificationsFailure,
    addNotificationRequest,
    addNotificationSuccess,
    addNotificationFailure,
} from '../../actions/notifications';

export type NotificationsAction =
    | ReturnType<typeof loadNotificationsRequest>
    | ReturnType<typeof loadNotificationsSuccess>
    | ReturnType<typeof loadNotificationsFailure>
    | ReturnType<typeof addNotificationRequest>
    | ReturnType<typeof addNotificationSuccess>
    | ReturnType<typeof addNotificationFailure>;

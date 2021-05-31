import {
    loadNotificationsRequest,
    loadNotificationsSuccess,
    loadNotificationsFailure,
    addNotificationRequest,
    addNotificationSuccess,
    addNotificationFailure,
    checkNotificationFailure,
    checkNotificationRequest,
    checkNotificationSuccess,
} from '../../actions/notifications';

export type NotificationsAction =
    | ReturnType<typeof loadNotificationsRequest>
    | ReturnType<typeof loadNotificationsSuccess>
    | ReturnType<typeof loadNotificationsFailure>
    | ReturnType<typeof addNotificationRequest>
    | ReturnType<typeof addNotificationSuccess>
    | ReturnType<typeof addNotificationFailure>
    | ReturnType<typeof checkNotificationRequest>
    | ReturnType<typeof checkNotificationSuccess>
    | ReturnType<typeof checkNotificationFailure>;

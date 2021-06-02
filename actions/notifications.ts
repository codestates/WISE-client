export const LOAD_NOTIFICATIONS_REQUEST = 'LOAD_NOTIFICATIONS_REQUEST' as const;
export const LOAD_NOTIFICATIONS_SUCCESS = 'LOAD_NOTIFICATIONS_SUCCESS' as const;
export const LOAD_NOTIFICATIONS_FAILURE = 'LOAD_NOTIFICATIONS_FAILURE' as const;

export const ADD_NOTIFICATION_REQUEST = 'ADD_NOTIFICATION_REQUEST' as const;
export const ADD_NOTIFICATION_SUCCESS = 'ADD_NOTIFICATION_SUCCESS' as const;
export const ADD_NOTIFICATION_FAILURE = 'ADD_NOTIFICATION_FAILURE' as const;

export const CHECK_NOTIFICATION_REQUEST = 'CHECK_NOTIFICATION_REQUEST' as const;
export const CHECK_NOTIFICATION_SUCCESS = 'CHECK_NOTIFICATION_SUCCESS' as const;
export const CHECK_NOTIFICATION_FAILURE = 'CHECK_NOTIFICATION_FAILURE' as const;

export const loadNotificationsRequest = (userId: string | string[], token: string) => ({
    type: LOAD_NOTIFICATIONS_REQUEST,
    userId,
    token,
});

export const loadNotificationsSuccess = (notifications: Notification[]) => ({
    type: LOAD_NOTIFICATIONS_SUCCESS,
    notifications,
});

export const loadNotificationsFailure = (error: string) => ({
    type: LOAD_NOTIFICATIONS_FAILURE,
    error,
});

export const addNotificationRequest = (data: {
    recipient: string | string[];
    subject: string;
    clientUrl: string;
    content: string;
}) => ({
    type: ADD_NOTIFICATION_REQUEST,
    data,
});

export const addNotificationSuccess = (notifications: Notification[]) => ({
    type: ADD_NOTIFICATION_SUCCESS,
    notifications,
});

export const addNotificationFailure = (error: string) => ({
    type: ADD_NOTIFICATION_FAILURE,
    error,
});

export const checkNotificationRequest = (notificationId: string) => ({
    type: CHECK_NOTIFICATION_REQUEST,
    notificationId,
});

export const checkNotificationSuccess = (notifications: Notification[]) => ({
    type: CHECK_NOTIFICATION_SUCCESS,
    notifications,
});

export const checkNotificationFailure = (error: string) => ({
    type: CHECK_NOTIFICATION_FAILURE,
    error,
});

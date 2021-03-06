/* eslint-disable @typescript-eslint/no-explicit-any */
export interface NotificationData {
    recipient: string | string[];
    subject: string;
    clientUrl: string;
    content: string;
}

export interface Notification {
    _id: string;
    sender: { id: string; name: string } | string;
    recipient: string;
    subject: string;
    clientUrl: string;
    content: string;
    isChecked: boolean;
}

export type NotificationsState = {
    loadNotificationsLoading: boolean;
    loadNotificationsDone: boolean;
    notifications: Notification[];
    loadNotificationsError: null | string;
    addNotificationLoading: boolean;
    addNotificationDone: boolean;
    addNotificationError: null | string;
    checkNotificationLoading: boolean;
    checkNotificationDone: boolean;
    checkNotificationError: null | string;
};

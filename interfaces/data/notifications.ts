export interface Notification {
    sender: string;
    recipient: string;
    subject: string;
    clientUrl: string;
    content: string;
    isChecked: boolean;
}

export type NotificationsState = {
    loadNotificationsLoading: boolean;
    loadNotificationsDone: boolean;
    notifications: Notification[] | [];
    loadNotificationsError: null | string;
    addNotificationLoading: boolean;
    addNotificationDone: boolean;
    addNotificationError: null | string;
};

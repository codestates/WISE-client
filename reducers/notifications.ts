/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import produce from 'immer';
import {
    LOAD_NOTIFICATIONS_REQUEST,
    LOAD_NOTIFICATIONS_SUCCESS,
    LOAD_NOTIFICATIONS_FAILURE,
    ADD_NOTIFICATION_REQUEST,
    ADD_NOTIFICATION_SUCCESS,
    ADD_NOTIFICATION_FAILURE,
    CHECK_NOTIFICATION_REQUEST,
    CHECK_NOTIFICATION_FAILURE,
    CHECK_NOTIFICATION_SUCCESS,
} from '../actions/notifications';
import { NotificationsAction } from '../interfaces/act/notifications';
import { NotificationsState } from '../interfaces/data/notifications';

export const initialState: NotificationsState = {
    loadNotificationsLoading: false,
    loadNotificationsDone: false,
    notifications: [],
    loadNotificationsError: null,
    addNotificationLoading: false,
    addNotificationDone: false,
    addNotificationError: null,
    checkNotificationLoading: false,
    checkNotificationDone: false,
    checkNotificationError: null,
};

const reducer = (state = initialState, action: NotificationsAction) =>
    produce(state, (draft: NotificationsState) => {
        switch (action.type) {
            case LOAD_NOTIFICATIONS_REQUEST:
                draft.loadNotificationsLoading = true;
                draft.loadNotificationsDone = false;
                draft.loadNotificationsError = null;
                break;
            case LOAD_NOTIFICATIONS_SUCCESS:
                draft.loadNotificationsLoading = false;
                draft.loadNotificationsDone = true;
                draft.notifications = action.notifications;
                break;
            case LOAD_NOTIFICATIONS_FAILURE:
                draft.loadNotificationsLoading = false;
                draft.loadNotificationsError = action.error;
                break;
            case ADD_NOTIFICATION_REQUEST:
                draft.addNotificationLoading = true;
                draft.addNotificationDone = false;
                draft.addNotificationError = null;
                break;
            case ADD_NOTIFICATION_SUCCESS:
                draft.addNotificationLoading = false;
                draft.addNotificationDone = true;
                break;
            case ADD_NOTIFICATION_FAILURE:
                draft.addNotificationLoading = false;
                draft.addNotificationError = action.error;
                break;
            case CHECK_NOTIFICATION_REQUEST:
                draft.checkNotificationLoading = true;
                draft.checkNotificationDone = false;
                draft.checkNotificationError = null;
                break;
            case CHECK_NOTIFICATION_SUCCESS: {
                draft.checkNotificationLoading = false;
                draft.checkNotificationDone = true;
                const notification = draft.notifications.find((v) => v._id === action.notification._id);
                if (notification) {
                    notification.isChecked = true;
                }
                break;
            }
            case CHECK_NOTIFICATION_FAILURE:
                draft.checkNotificationLoading = false;
                draft.checkNotificationError = action.error;
                break;
            default:
                break;
        }
    });

export default reducer;

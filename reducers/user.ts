import { AnyAction } from 'redux';
import { SIGN_UP_REQUEST } from '../actions/user';

export type UserState = {
    signupRequest: boolean;
    signedUp: boolean;
};

// initial state
export const initialState = {
    signupRequest: false,
    signedUp: false,
};

const reducer = (state: UserState = initialState, action: AnyAction): UserState => {
    switch (action.type) {
        case SIGN_UP_REQUEST:
            return {
                ...state,
                signupRequest: false,
            };
        default:
            return state;
    }
};

export default reducer;

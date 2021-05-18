import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

<<<<<<< HEAD
import user from './user';

=======
<<<<<<< HEAD
import user from './user';

=======
>>>>>>> cf58c611a460e5843f7198676fc32e50e7cb851a
>>>>>>> 59c2ae8613ac0b80336bcc44b960bff7e4cc5709
const rootReducer = combineReducers({
    index: (state = {}, action) => {
        switch (action.type) {
            case HYDRATE:
                return { ...state, ...action.payload };
            default:
                return state;
        }
    },
<<<<<<< HEAD
    user,
=======
<<<<<<< HEAD
    user,
=======
>>>>>>> cf58c611a460e5843f7198676fc32e50e7cb851a
>>>>>>> 59c2ae8613ac0b80336bcc44b960bff7e4cc5709
});

export default rootReducer;

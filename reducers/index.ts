/* eslint-disable @typescript-eslint/no-explicit-any */
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers, Reducer, AnyAction } from 'redux';
import user from './user';
import service from './service';
import order from './order';
import review from './review';
import payment from './payment';
import notifications from './notifications';
// import { CombinedState } from '../store/configureStore';

const rootReducer: Reducer<any, AnyAction> = (state, action) => {
    switch (action.type) {
        case HYDRATE:
            return action.payload;
        default: {
            const combinedReducer = combineReducers({
                user,
                service,
                order,
                review,
                payment,
                notifications,
            });
            return combinedReducer(state, action);
        }
    }
};

export default rootReducer;

// 루트 리듀서의 반환값를 유추
// 추후 이 타입을 컴포넌트에서 불러와서 사용해야 하므로 내보내줌
export type RootState = ReturnType<typeof rootReducer>;

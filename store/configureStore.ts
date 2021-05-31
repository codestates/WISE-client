import { applyMiddleware, createStore, compose } from 'redux';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas';
import rootReducer from '../reducers';
import { UserState } from '../interfaces/data/user';
import { ServiceState } from '../interfaces/data/service';
import { OrderState } from '../interfaces/data/order';
import { PaymentState } from '../interfaces/data/payment';
import { ReviewState } from '../interfaces/data/review';
import { NotificationsState } from '../interfaces/data/notifications';

export interface CombinedState {
    index: string;
    user: UserState;
    service: ServiceState;
    order: OrderState;
    payment: PaymentState;
    review: ReviewState;
    notifications: NotificationsState;
}

const configureStore: MakeStore<CombinedState> = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer =
        process.env.NEXT_PUBLIC_NODE_ENV === 'production'
            ? compose(applyMiddleware(...middlewares))
            : composeWithDevTools(applyMiddleware(...middlewares));
    const store = createStore(rootReducer, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

const wrapper = createWrapper<CombinedState>(configureStore, { debug: process.env.NODE_ENV === 'development' });

export default wrapper;

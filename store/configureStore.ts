import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose, Store } from 'redux';
import { createWrapper, Context } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer, { IndexState } from '../reducers';
import { UserState } from '../reducers/user';

export type CombinedState = {
    index: string;
    user: UserState;
};

const configureStore = (context: Context) => {
    const middlewares = [thunk];
    const enhancer =
        process.env.NODE_ENV === 'production'
            ? compose(applyMiddleware(...middlewares))
            : composeWithDevTools(applyMiddleware(...middlewares));
    const store = createStore(reducer, enhancer);
    return store;
};

const wrapper = createWrapper<Store<CombinedState>>(configureStore, { debug: process.env.NODE_ENV === 'development' });

export default wrapper;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer, { resetAuth } from './slice/auth';
import booksReducer, { resetBook } from './slice/book';
import transactionsReducer, { resetRequests } from './slice/transaction';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const persistConfig = {
    key: "root",
    blackList: [],
    storage,
}

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        auth: authReducer,
        books: booksReducer,
        transactions: transactionsReducer
    })
)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        })
    }
});

export const persistor = persistStore(store);

export const resetRedux = () => {
    store.dispatch(resetAuth());
    store.dispatch(resetBook());
    store.dispatch(resetRequests());
};




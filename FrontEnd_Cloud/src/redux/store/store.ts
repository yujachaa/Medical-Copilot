//redux store 저장공간

import { combineReducers, configureStore, createAction } from '@reduxjs/toolkit';
import testSlices from '../features/testSlice';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import modalSlices from '../features/modal/modalSlice';
import authSlice from '../features/auth/authSlice';

export const resetState = createAction('RESET_STATE');

const persistConfig = {
  key: 'persist',
  storage,
  // whitelist:['pro']
  // blacklist :
};

const reducer = combineReducers({
  test: testSlices.reducer,
  modal: modalSlices.reducer,
  auth: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

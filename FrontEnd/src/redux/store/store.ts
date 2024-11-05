//redux store 저장공간

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import testSlices from '../features/testSlice';
import tabSlices from '../features/tab/tabSlice';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import userSlices from '../features/user/userSlice';

const persistConfig = {
  key: 'persist',
  storage,
  // whitelist:['pro']
  // blacklist :
};

const reducer = combineReducers({
  test: testSlices.reducer,
  tab: tabSlices.reducer,
  user: userSlices.reducer,
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

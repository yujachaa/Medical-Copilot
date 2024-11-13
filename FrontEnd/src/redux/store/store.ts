//redux store 저장공간
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import testSlices from '../features/testSlice';
import tabSlices from '../features/tab/tabSlice';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import userSlices from '../features/user/userSlice';
import mainSlices from '../features/main/mainSlice';
import AlarmSlices from '../features/alarm/alarmSlice';
import coordinateSlices from '../features/report/coordinateSlice';
import reportSlices from '../features/report/reportSlice';

const persistConfig = {
  key: 'persist',
  storage,
  // whitelist:['pro']
  // blacklist :
};

const reducer = combineReducers({
  alarm: AlarmSlices.reducer,
  test: testSlices.reducer,
  tab: tabSlices.reducer,
  user: userSlices.reducer,
  main: mainSlices.reducer,
  coordinate: coordinateSlices.reducer,
  report: reportSlices.reducer,
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

//redux store 저장공간
import { combineReducers, configureStore, createAction } from '@reduxjs/toolkit';
import testSlices from '../features/testSlice';
import tabSlices from '../features/tab/tabSlice';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import userSlices from '../features/user/userSlice';
import AlarmSlices from '../features/alarm/alarmSlice';
import coordinateSlices from '../features/report/coordinateSlice';
import reportSlices from '../features/report/reportSlice';
import fipSlice from '../features/fip/fipSlice';
import requestSlices from '../features/request/requestSlice';

export const resetState = createAction('RESET_STATE');

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
  coordinate: coordinateSlices.reducer,
  report: reportSlices.reducer,
  fip: fipSlice.reducer,
  request: requestSlices.reducer,
});

const rootReducer = (state: ReturnType<typeof reducer> | undefined, action: any) => {
  if (action.type === resetState.type) {
    state = undefined; // 전체 상태를 초기화
  }
  return reducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

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

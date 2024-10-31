'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <main>{children}</main>
      </PersistGate>
    </Provider>
  );
};

export default ClientLayout;

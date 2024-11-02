import { createSlice } from '@reduxjs/toolkit';

type modalProps = {
  clientAdd: boolean;
  errorLog: boolean;
};

const initialState: modalProps = {
  clientAdd: false,
  errorLog: false,
};

// action: PayloadAction<number>

const modalSlices = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    setClientAddModal(state) {
      state.clientAdd = !state.clientAdd;
    },
    setErrorLogModal(state) {
      state.errorLog = !state.errorLog;
    },
  },
});

export const { setClientAddModal } = modalSlices.actions;
export default modalSlices;

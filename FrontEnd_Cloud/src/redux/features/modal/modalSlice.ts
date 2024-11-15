import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type modalProps = {
  clientAdd: boolean;
  warning: boolean;
  clientModify: boolean;
  isStarted: boolean;
};

const initialState: modalProps = {
  clientAdd: false,
  warning: false,
  clientModify: false,
  isStarted: false,
};

const modalSlices = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    setClientAddModal(state) {
      state.clientAdd = !state.clientAdd;
    },
    setWarningModal(state) {
      state.warning = !state.warning;
    },
    setClientModifyModal(state) {
      state.clientModify = !state.clientModify;
    },
    setIsStarted(state, action: PayloadAction<boolean>) {
      state.isStarted = action.payload;
    },
  },
});

export const { setClientAddModal, setWarningModal, setClientModifyModal, setIsStarted } =
  modalSlices.actions;
export default modalSlices;

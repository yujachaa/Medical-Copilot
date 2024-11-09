import { createSlice } from '@reduxjs/toolkit';

type modalProps = {
  clientAdd: boolean;
  warning: boolean;
  clientModify: boolean;
};

const initialState: modalProps = {
  clientAdd: false,
  warning: false,
  clientModify: false,
};

// action: PayloadAction<number>

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
  },
});

export const { setClientAddModal, setWarningModal, setClientModifyModal } = modalSlices.actions;
export default modalSlices;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type {};

type FipProps = {
  finding: string;
  impression: string;
  plan: string;
};

const initialState: FipProps = {
  finding: '',
  impression: '',
  plan: '',
};

const fipSlice = createSlice({
  name: 'fip',
  initialState: initialState,
  reducers: {
    setFinding: (state, action: PayloadAction<string>) => {
      state.finding = action.payload;
    },
    setImpression: (state, action: PayloadAction<string>) => {
      state.impression = action.payload;
    },
    setPlan: (state, action: PayloadAction<string>) => {
      state.plan = action.payload;
    },
    setInit: (state) => {
      state.finding = '';
      state.impression = '';
      state.plan = '';
    },
  },
});

export const { setFinding, setImpression, setPlan, setInit } = fipSlice.actions;
export default fipSlice;

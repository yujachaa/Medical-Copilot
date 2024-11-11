import { fetchAlarmOTP } from '@/apis/alarm';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type {};

type AlarmProps = {
  otp: string;
  status: string;
  error: string;
};

const initialState: AlarmProps = {
  otp: '',
  status: '',
  error: '',
};

export const getOTP = createAsyncThunk('alarmSlices/getOTP', async () => {
  const response = await fetchAlarmOTP();
  return response;
});

const AlarmSlices = createSlice({
  name: 'alarm',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOTP.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOTP.fulfilled, (state, action) => {
        console.log(action.payload);
        state.otp = action.payload.otp;
      })
      .addCase(getOTP.rejected, (state) => {
        state.error = 'error';
      });
  },
});

export const {} = AlarmSlices.actions;
export default AlarmSlices;

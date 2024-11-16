// 으아아아아ㅏ아아아ㅏ아아ㅏㅏㅏㅏㅏ
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type requestType = {
  reportId: string;
  selectedTabPathName: string;
};

const initialState: requestType = {
  reportId: '',
  selectedTabPathName: '',
};

const requestSlices = createSlice({
  name: 'request',
  initialState: initialState,
  reducers: {
    setReportId: (state, action: PayloadAction<string>) => {
      state.reportId = action.payload;
    },
    setSelectedTabPathName: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.selectedTabPathName = action.payload;
    },
  },
});

export const { setReportId, setSelectedTabPathName } = requestSlices.actions;
export default requestSlices;

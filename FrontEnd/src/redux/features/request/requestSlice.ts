// 으아아아아ㅏ아아아ㅏ아아ㅏㅏㅏㅏㅏ
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type requestType = {
  reportId: string;
  selectedTabPathName: string;
  loading: boolean;
};

const initialState: requestType = {
  reportId: '',
  selectedTabPathName: '',
  loading: false,
};

const requestSlices = createSlice({
  name: 'request',
  initialState: initialState,
  reducers: {
    setReportId: (state, action: PayloadAction<string>) => {
      state.reportId = action.payload;
    },
    setSelectedTabPathName: (state, action: PayloadAction<string>) => {
      state.selectedTabPathName = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setReportId, setSelectedTabPathName, setLoading } = requestSlices.actions;
export default requestSlices;

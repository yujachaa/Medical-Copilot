// slices/reportSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReportDataType } from '@/types/report';

interface ReportState {
  reportData: ReportDataType | null;
}

const initialState: ReportState = {
  reportData: null,
};

const reportSlices = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setReportData: (state, action: PayloadAction<ReportDataType>) => {
      state.reportData = action.payload;
    },
    updateReportData: (state, action: PayloadAction<Partial<ReportDataType>>) => {
      if (state.reportData) {
        state.reportData = { ...state.reportData, ...action.payload };
      }
    },
    clearReportData: (state) => {
      state.reportData = null;
    },
  },
});

export const { setReportData, updateReportData, clearReportData } = reportSlices.actions;
export default reportSlices;

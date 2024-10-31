//redux store 저장공간

import { createSlice } from '@reduxjs/toolkit';

const testSlices = createSlice({
  name: 'test',
  initialState: 0,
  reducers: {
    setPlus: (state) => {
      return state + 1;
    },
  },
});

export const { setPlus } = testSlices.actions;
export default testSlices;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Patient = {
  sex: 'FEMALE' | 'MALE' | '';
  age: number;
  visitDate: string;
  pid: string;
  modality: string;
};

const initialState: Patient = {
  sex: '',
  age: 0,
  visitDate: '',
  pid: '',
  modality: '',
};

const mainSlices = createSlice({
  name: 'main',
  initialState: initialState,
  reducers: {
    setPatient: (state, action: PayloadAction<Patient>) => {
      state.sex = action.payload.sex;
      state.age = action.payload.age;
      state.modality = action.payload.modality;
      state.visitDate = action.payload.visitDate;
      state.pid = action.payload.pid;
    },
  },
});

export const { setPatient } = mainSlices.actions;
export default mainSlices;

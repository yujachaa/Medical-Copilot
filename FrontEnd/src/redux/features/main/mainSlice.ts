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
    setModality: (state, action: PayloadAction<string>) => {
      state.modality = action.payload;
    },
  },
});

export const { setPatient, setModality } = mainSlices.actions;
export default mainSlices;

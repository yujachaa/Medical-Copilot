import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Patient = {
  sex: 'FEMALE' | 'MALE' | '';
  age: number;
  visitDate: string;
  pid: string;
  modality: string | null;
  image: string | null;
};

export type PatientReqeust = {
  PID: string;
  image: string | null;
  shootingDate: string;
  sex: 'FEMALE' | 'MALE' | '';
  age: number;
  comments: string;
  key: string;
  agent: string;
};

type initialProps = {
  patient: Patient;
  patientRequest: PatientReqeust;
};

const initialState: initialProps = {
  patient: {
    sex: '',
    age: 0,
    visitDate: '',
    pid: '',
    modality: null,
    image: null,
  }, // 일반 key와 image는 default로 가지고 있겠습니다
  patientRequest: {
    PID: '',
    image: '',
    shootingDate: '',
    sex: '',
    age: 0,
    comments: '',
    key: 'ccf97220-30b3-4780-acab-295301698be0',
    agent: '',
  },
};

const mainSlices = createSlice({
  name: 'main',
  initialState: initialState,
  reducers: {
    setPatient: (state, action: PayloadAction<Patient>) => {
      state.patient.sex = action.payload.sex;
      state.patient.age = action.payload.age;
      state.patient.modality = action.payload.modality;
      state.patient.visitDate = action.payload.visitDate;
      state.patient.pid = action.payload.pid;

      state.patientRequest.sex = action.payload.sex;
      state.patientRequest.age = action.payload.age;
      state.patientRequest.PID = action.payload.pid;
      state.patientRequest.shootingDate = action.payload.visitDate;
      state.patientRequest.image = action.payload.image;
    },
    setModality: (state, action: PayloadAction<string>) => {
      state.patientRequest.agent = action.payload;
      state.patient.modality = action.payload;
    },
    //보낼 이미지를 저장하는 함수
    setReqeustImage: (state, action: PayloadAction<string>) => {
      state.patientRequest.image = action.payload;
    },
  },
});

export const { setPatient, setModality } = mainSlices.actions;
export default mainSlices;

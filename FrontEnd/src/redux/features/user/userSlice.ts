import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userType = {
  createDate: string;
  modifiedDate: string;
  accessToken: string;
  email: string;
  name: string;
  serialKey: string;
  role: string;
};

const initialState: userType = {
  createDate: '',
  modifiedDate: '',
  accessToken: '',
  email: '',
  name: '',
  serialKey: '',
  role: '',
};

const userSlices = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<userType>) {
      state.createDate = action.payload.createDate;
      state.modifiedDate = action.payload.modifiedDate;
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.serialKey = action.payload.serialKey;
      state.role = action.payload.role;
    },

    setInit(state) {
      state.createDate = '';
      state.modifiedDate = '';
      state.accessToken = '';
      state.email = '';
      state.name = '';
      state.serialKey = '';
      state.role = '';
    },
  },
});

export const { setUserInfo, setInit } = userSlices.actions;
export default userSlices;

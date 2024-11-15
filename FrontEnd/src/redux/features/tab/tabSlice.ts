import { PluginType } from '@/components/Tabs/Tab';
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

export type tab = {
  id: number;
  title: string;
  type: PluginType;
  patient: Patient;
  pathname: string;
  patientRequest: PatientReqeust;
};

type tabProps = {
  tablist: tab[];
  selectedTab: number;
  increment: number;
  selectedIndex: number;
};

type changeTab = {
  pathname: string;
  title: string;
};

const initialState: tabProps = {
  tablist: [
    {
      id: 0,
      title: 'Medical Copilot',
      type: 'MG',
      patient: {
        sex: '',
        age: 0,
        visitDate: '',
        pid: '',
        modality: '',
        image: '',
      },
      patientRequest: {
        PID: '',
        image: '',
        shootingDate: '',
        sex: '',
        age: 0,
        comments: '',
        key: '',
        agent: '',
      },
      pathname: '/medical/main',
    },
    {
      id: 1,
      title: 'My Chat',
      type: 'CXR',
      patient: {
        sex: '',
        age: 0,
        visitDate: '',
        pid: '',
        modality: '',
        image: '',
      },
      patientRequest: {
        PID: '',
        image: '',
        shootingDate: '',
        sex: '',
        age: 0,
        comments: '',
        key: '',
        agent: '',
      },
      pathname: '/medical/mychat',
    },
    {
      id: 2,
      title: 'My Page',
      type: 'MG',
      patient: {
        sex: '',
        age: 0,
        visitDate: '',
        pid: '',
        modality: '',
        image: '',
      },
      patientRequest: {
        PID: '',
        image: '',
        shootingDate: '',
        sex: '',
        age: 0,
        comments: '',
        key: '',
        agent: '',
      },
      pathname: '/medical/mypage?t=profile',
    },
    {
      id: 3,
      title: 'My temp',
      type: 'MG',
      patient: {
        sex: 'MALE',
        age: 58,
        visitDate: '2022-05-15',
        pid: '1',
        modality: 'CXR',
        image: 'https://example.com/cxr.jpg',
      },
      patientRequest: {
        PID: '',
        image: '',
        shootingDate: '',
        sex: '',
        age: 0,
        comments: '',
        key: '',
        agent: '',
      },
      pathname: '/medical/temp/2',
    },
    {
      id: 4,
      title: '1 Dignosis',
      type: 'CXR',
      patient: {
        sex: 'MALE',
        age: 58,
        visitDate: '2022-05-15',
        pid: '1',
        modality: 'CXR',
        image: 'https://example.com/cxr.jpg',
      },
      patientRequest: {
        PID: '',
        image: '',
        shootingDate: '',
        sex: '',
        age: 0,
        comments: '',
        key: '',
        agent: '',
      },
      pathname: '/medical/chat/1',
    },
  ],
  selectedTab: 0,
  increment: 5,
  selectedIndex: 0,
};

const tabSlices = createSlice({
  name: 'tab',
  initialState: initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<number>) => {
      const index = state.tablist.findIndex((tab) => tab.id === action.payload);
      if (index !== -1) {
        state.selectedIndex = index;
      }
    },
    addTab: (state) => {
      const newTab: tab = {
        id: ++state.increment,
        title: `New Tab`,
        type: 'MG',
        patient: {
          sex: '',
          age: 0,
          visitDate: '',
          pid: '',
          modality: '',
          image: '',
        },
        patientRequest: {
          PID: '',
          image: '',
          shootingDate: '',
          sex: '',
          age: 0,
          comments: '',
          key: '',
          agent: '',
        },
        pathname: '/medical/main',
      };
      state.tablist.push(newTab);
      state.selectedIndex = state.tablist.length - 1;
    },

    addTempTab: (state, action: PayloadAction<{ patient: Patient; uuid: string }>) => {
      const { patient, uuid } = action.payload;
      state.tablist[state.selectedIndex].pathname = `/medical/temp/${uuid}`;
      state.tablist[state.selectedIndex].title =
        `${patient.modality === 'MG' || patient.modality === '' ? 'MG' : patient.modality} Plugin`;
      state.tablist[state.selectedIndex].patient = JSON.parse(JSON.stringify(patient));
      state.tablist[state.selectedIndex].type =
        `${patient.modality === 'MG' || patient.modality === '' ? 'MG' : 'CXR'}`;
    },

    deleteTab: (state, action: PayloadAction<number>) => {
      if (state.tablist.length === 1) {
        alert('탭은 적어도 1개 이상이어야 합니다');
        return;
      }
      const index = state.tablist.findIndex((tab) => tab.id === action.payload);
      if (index !== -1) {
        if (index < state.selectedIndex) {
          state.selectedIndex--;
        } else if (index === state.selectedIndex && index === state.tablist.length - 1)
          state.selectedIndex--;
      }
      const temp = state.tablist.filter((tab) => tab.id !== action.payload);
      state.tablist = [...temp];
    },
    initialIndex: (state) => {
      state.selectedIndex = -1;
    },
    //로고 클릭했을때 탭 메인으로 이동
    goMain: (state) => {
      state.tablist[state.selectedIndex].pathname = '/medical/main';
      state.tablist[state.selectedIndex].title = 'medical Copilot';
      state.tablist[state.selectedIndex].type = 'MG';
    },
    //선택된 탭의 종류가 바뀐다.
    setTabPathname: (state, action: PayloadAction<changeTab>) => {
      state.tablist[state.selectedIndex].pathname = action.payload.pathname;
      state.tablist[state.selectedIndex].title = action.payload.title;
      //이에 맞는 플러그인타입 분기처리도 해줘야할듯!
    },
    goMypage: (state, action: PayloadAction<string>) => {
      const index = state.tablist.findIndex((tab) => tab.pathname.includes('mypage'));
      console.log(action.payload);
      //기존의 탭이 있는 경우 세팅클릭하면 이동
      if (index !== -1) {
        state.tablist[index].pathname = action.payload;
        state.tablist[index].title = 'My Page';
        state.selectedIndex = index;
        state.tablist[index].type = 'MG';
      }
      //없다면 새탭으로 이동
      else {
        const newTab: tab = {
          id: ++state.increment,
          title: `My Page`,
          type: 'MG',
          patient: {
            sex: '',
            age: 0,
            visitDate: '',
            pid: '',
            modality: '',
            image: '',
          },
          patientRequest: {
            PID: '',
            image: '',
            shootingDate: '',
            sex: '',
            age: 0,
            comments: '',
            key: '',
            agent: '',
          },
          pathname: action.payload,
        };
        state.tablist.push(newTab);
        state.selectedIndex = state.tablist.length - 1;
      }
    },
    setPatient: (state, action: PayloadAction<Patient>) => {
      state.tablist[state.selectedIndex].patient = {
        sex: action.payload.sex,
        age: action.payload.age,
        modality: action.payload.modality,
        visitDate: action.payload.visitDate,
        pid: action.payload.pid,
        image: action.payload.image,
      };
    },
    setRequestModality: (state, action: PayloadAction<string>) => {
      state.tablist[state.selectedIndex].patientRequest = {
        sex: state.tablist[state.selectedIndex].patient!.sex,
        age: state.tablist[state.selectedIndex].patient!.age,
        agent: action.payload,
        shootingDate: state.tablist[state.selectedIndex].patient!.visitDate,
        PID: state.tablist[state.selectedIndex].patient!.pid,
        image: state.tablist[state.selectedIndex].patient!.image,
        comments: '',
        key: 'ccf97220-30b3-4780-acab-295301698be0',
      };
    },
  },
});

export const {
  setSelectedTab,
  addTab,
  deleteTab,
  initialIndex,
  goMain,
  setTabPathname,
  goMypage,
  addTempTab,
  setPatient,
  setRequestModality,
} = tabSlices.actions;
export default tabSlices;

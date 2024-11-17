import { MessageType } from '@/app/medical/temp/[id]/TempLayout';
import { Noti } from '@/components/Alarm/SSEHandler';
import { PatientHistory } from '@/components/PatientHistory/PatientHistory';
import { PluginType } from '@/components/Tabs/Tab';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Patient = {
  sex: string;
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
  sex: string;
  age: number;
  comment: string;
  key: string;
  agent: string | null;
};

export type tab = {
  id: number;
  title: string;
  type: PluginType;
  patient: Patient;
  pathname: string;
  patientRequest: PatientReqeust;
  messageList: MessageType[];
  firstMessage: string;
  isFirst: boolean;
};

type tabProps = {
  tablist: tab[];
  selectedTab: number;
  increment: number;
  selectedIndex: number;
  loading: boolean;
  loadingTabPathName: string;
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
        comment: '',
        key: '',
        agent: '',
      },
      messageList: [],
      firstMessage: '',
      isFirst: true,
      pathname: '/medical/main',
    },
  ],
  selectedTab: 0, // 안씀
  increment: 5,
  selectedIndex: 0,
  loading: false,
  loadingTabPathName: '',
};

const tabSlices = createSlice({
  name: 'tab',
  initialState: initialState,
  reducers: {
    setTabHome: (state) => {
      state.tablist[state.selectedIndex] = {
        id: ++state.increment,
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
          comment: '',
          key: '',
          agent: '',
        },
        messageList: [],
        firstMessage: '',
        isFirst: true,
        pathname: '/medical/main',
      };
    },
    setLoadingTabPathName: (state, action: PayloadAction<string>) => {
      state.loadingTabPathName = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSelectedTab: (state, action: PayloadAction<number>) => {
      const index = state.tablist.findIndex((tab) => tab.id === action.payload);
      if (index !== -1) {
        state.selectedIndex = index;
      }
    },
    setDispatchMessageList: (state, action: PayloadAction<MessageType[]>) => {
      state.tablist[state.selectedIndex].messageList = [
        ...state.tablist[state.selectedIndex].messageList,
        ...action.payload,
      ];
      state.loading = true;
    },
    setPrevMessageList: (state, action: PayloadAction<MessageType[]>) => {
      state.tablist[state.selectedIndex].messageList = [
        ...action.payload,
        ...state.tablist[state.selectedIndex].messageList,
      ];
      // state.loading = true;
    },
    addAgentMessage: (
      state,
      action: PayloadAction<{ alarmTabIdx: number; message: MessageType }>,
    ) => {
      state.tablist[action.payload.alarmTabIdx].messageList = [
        ...state.tablist[action.payload.alarmTabIdx].messageList,
        action.payload.message,
      ];
    },
    addPrevAgentMessage: (
      //앞에 agent 메세지 추가
      state,
      action: PayloadAction<{ alarmTabIdx: number; message: MessageType }>,
    ) => {
      state.tablist[action.payload.alarmTabIdx].messageList = [
        action.payload.message,
        ...state.tablist[action.payload.alarmTabIdx].messageList,
      ];
    },
    setIsFirst: (state) => {
      state.tablist[state.selectedIndex].isFirst = false;
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
          comment: '',
          key: '',
          agent: '',
        },
        messageList: [],
        firstMessage: '',
        isFirst: true,
        pathname: '/medical/main',
      };
      state.tablist.push(newTab);
      state.selectedIndex = state.tablist.length - 1;
    },

    addTempTab: (
      state,
      action: PayloadAction<{ patient: Patient; uuid: string; firstMessage: string }>,
    ) => {
      const { patient, uuid } = action.payload;
      state.tablist[state.selectedIndex].pathname = `/medical/temp/${uuid}`;
      state.tablist[state.selectedIndex].firstMessage = action.payload.firstMessage;
      state.tablist[state.selectedIndex].title =
        `${patient.modality === 'MG' || patient.modality === '' ? 'MG' : patient.modality} Plugin`;
      state.tablist[state.selectedIndex].patient = JSON.parse(JSON.stringify(patient));
      state.tablist[state.selectedIndex].type =
        `${patient.modality === 'MG' || patient.modality === '' ? 'MG' : 'CXR'}`;
      state.tablist[state.selectedIndex].messageList = [];
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
            comment: '',
            key: '',
            agent: '',
          },
          messageList: [],
          firstMessage: '',
          isFirst: true,
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
    setPatientModality: (state, action: PayloadAction<string>) => {
      state.tablist[state.selectedIndex].patient = {
        sex: state.tablist[state.selectedIndex].patient.sex,
        age: state.tablist[state.selectedIndex].patient.age,
        modality: action.payload,
        visitDate: state.tablist[state.selectedIndex].patient.visitDate,
        pid: state.tablist[state.selectedIndex].patient.pid,
        image: state.tablist[state.selectedIndex].patient.image,
      };
    },
    setPatientInit: (state) => {
      state.tablist[state.selectedIndex].patient = {
        sex: '',
        age: 0,
        modality: '',
        visitDate: '',
        pid: '',
        image: '',
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
        comment: '',
        key: 'ccf97220-30b3-4780-acab-295301698be0',
      };
    },

    //히스토리 데이터를 받아도? 괜찮을듯
    setHistoryTab: (state, action: PayloadAction<PatientHistory>) => {
      const index = state.tablist.findIndex(
        (tab) => tab.pathname === '/medical/chat/' + action.payload.PID,
      );
      //해당 탭이 존재한다면?!
      if (index !== -1) {
        //선택을 이동
        state.selectedIndex = index;
      }
      //존재하지 않는다면 새로운 탭을 생성
      else {
        {
          const newTab: tab = {
            id: ++state.increment,
            title: `${action.payload.PID} Analytics`,
            type: 'MG',
            patient: {
              sex: action.payload.sex,
              age: action.payload.age,
              visitDate: action.payload.recentDate,
              pid: action.payload.PID,
              modality: '',
              image: '',
            },
            patientRequest: {
              PID: '',
              image: '',
              shootingDate: '',
              sex: '',
              age: 0,
              comment: '',
              key: '',
              agent: '',
            },
            messageList: [],
            firstMessage: '',
            isFirst: true,
            pathname: `/medical/chat/${action.payload.PID}`,
          };
          state.tablist.push(newTab);
          state.selectedIndex = state.tablist.length - 1;
        }
      }
    },
    setAlarmTab: (state, action: PayloadAction<Noti>) => {
      const index = state.tablist.findIndex((tab) =>
        tab.pathname.includes('/medical/chat/' + action.payload.patientId),
      );
      //해당 탭이 존재한다면?!
      if (index !== -1) {
        //선택을 이동
        state.selectedIndex = index;
        state.tablist[state.selectedIndex].pathname =
          '/medical/chat/' + action.payload.patientId + `?reportId=${action.payload.reportId}`;
      }
      //존재하지 않는다면 새로운 탭을 생성
      else {
        {
          const newTab: tab = {
            id: ++state.increment,
            title: `${action.payload.patientId} Analytics`,
            type: 'MG',
            patient: {
              sex: '',
              age: 0,
              visitDate: action.payload.createdDate,
              pid: action.payload.patientId,
              modality: action.payload.modality,
              image: '',
            },
            patientRequest: {
              PID: '',
              image: '',
              shootingDate: '',
              sex: '',
              age: 0,
              comment: '',
              key: '',
              agent: '',
            },
            messageList: [],
            firstMessage: '',
            isFirst: true,
            pathname:
              `/medical/chat/${action.payload.patientId} ` + `?reportId=${action.payload.reportId}`,
          };
          state.tablist.push(newTab);
          state.selectedIndex = state.tablist.length - 1;
        }
      }
    },
    setMyChatTab: (state) => {
      const index = state.tablist.findIndex((tab) => tab.pathname.includes('/medical/mychat'));
      //해당 탭이 존재한다면?!
      if (index !== -1) {
        //선택을 이동
        state.selectedIndex = index;
      }
      //존재하지 않는다면 새로운 탭을 생성
      else {
        {
          const newTab: tab = {
            id: ++state.increment,
            title: `My Chat`,
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
              comment: '',
              key: '',
              agent: '',
            },
            pathname: `/medical/mychat`,
            messageList: [],
            firstMessage: '',
            isFirst: false,
          };
          state.tablist.push(newTab);
          state.selectedIndex = state.tablist.length - 1;
        }
      }
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
  setHistoryTab,
  setAlarmTab,
  setMyChatTab,
  setPatientInit,
  setDispatchMessageList,
  setIsFirst,
  setPatientModality,
  addAgentMessage,
  addPrevAgentMessage,
  setLoadingTabPathName,
  setLoading,
  setTabHome,
  setPrevMessageList,
} = tabSlices.actions;
export default tabSlices;

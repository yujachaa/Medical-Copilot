import { PluginType } from '@/components/Tabs/Tab';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Patient } from '../main/mainSlice';

type TabType = 'default' | 'chat';
export type tab = {
  id: number;
  title: string;
  type: PluginType;
  tabType: TabType;
  pid: number;
  pathname: string;
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
      tabType: 'default',
      pid: -1,
      pathname: '/medical/main',
    },
    { id: 1, title: 'My Chat', type: 'CXR', tabType: 'chat', pid: 1, pathname: '/medical/mychat' },
    {
      id: 2,
      title: 'My Page',
      type: 'MG',
      tabType: 'chat',
      pid: 1,
      pathname: '/medical/mypage?t=profile',
    },
    { id: 3, title: 'My temp', type: 'MG', tabType: 'chat', pid: 1, pathname: '/medical/temp/2' },
    {
      id: 4,
      title: '1 Dignosis',
      type: 'CXR',
      tabType: 'chat',
      pid: 1,
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
        tabType: 'default',
        pid: -1,
        pathname: '/medical/main',
      };
      state.tablist.push(newTab);
      state.selectedIndex = state.tablist.length - 1;
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
    //환자DB선택했을때 탭이동
    moveTab: (state, action: PayloadAction<Patient>) => {
      //환자탭이 존재할때 : 기존탭에서 찾고 이동
      const index = state.tablist.findIndex((tab) => tab.pid === Number(action.payload.pid));

      //환자탭이 없을때 : 새탭을 만들지 말고 현재 탭에 대입하는게 맞지
      if (index === -1) {
        state.tablist[state.selectedIndex].title = `${action.payload.pid} Diagnosis`;
        state.tablist[state.selectedIndex].type =
          `${action.payload.modality === '' ? 'MG' : 'CXR'}`;
        state.tablist[state.selectedIndex].tabType = 'chat';
        state.tablist[state.selectedIndex].pid = Number(action.payload.pid);
      } else {
        if (action.payload.modality === '') {
          state.tablist[index].type = 'MG';
        } else state.tablist[index].type = 'CXR';
        state.selectedIndex = index;
      }
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
    },
    goMypage: (state, action: PayloadAction<string>) => {
      const index = state.tablist.findIndex((tab) => tab.pathname.includes('mypage'));
      console.log(action.payload);
      //기존의 탭이 있는 경우 세팅클릭하면 이동
      if (index !== -1) {
        state.tablist[index].pathname = action.payload;
        state.tablist[index].title = 'My Page';
        state.selectedIndex = index;
      }
      //없다면 새탭으로 이동
      else {
        const newTab: tab = {
          id: ++state.increment,
          title: `My Page`,
          type: 'MG',
          tabType: 'default',
          pid: -1,
          pathname: action.payload,
        };
        state.tablist.push(newTab);
        state.selectedIndex = state.tablist.length - 1;
      }
    },
  },
});

export const {
  setSelectedTab,
  addTab,
  deleteTab,
  initialIndex,
  moveTab,
  goMain,
  setTabPathname,
  goMypage,
} = tabSlices.actions;
export default tabSlices;

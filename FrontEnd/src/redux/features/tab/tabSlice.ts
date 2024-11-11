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
};

type tabProps = {
  tablist: tab[];
  selectedTab: number;
  increment: number;
  selectedIndex: number;
};

const initialState: tabProps = {
  tablist: [
    { id: 0, title: 'Default Plugin', type: 'MG', tabType: 'default', pid: -1 },
    { id: 1, title: '1 Dignosis', type: 'CXR', tabType: 'chat', pid: 1 },
  ],
  selectedTab: 0,
  increment: 1,
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
      state.selectedTab = action.payload;
    },
    addTab: (state) => {
      const newTab: tab = {
        id: ++state.increment,
        title: `New Tab`,
        type: 'MG',
        tabType: 'default',
        pid: -1,
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
  },
});

export const { setSelectedTab, addTab, deleteTab, initialIndex, moveTab } = tabSlices.actions;
export default tabSlices;

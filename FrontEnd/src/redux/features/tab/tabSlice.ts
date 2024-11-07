import { PatientData } from '@/components/PatientDB/PatientDB';
import { PluginType } from '@/components/Tabs/Tab';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    { id: 0, title: 'Default Plugin', type: 'default', tabType: 'default', pid: -1 },
    { id: 1, title: '1 Dignosis', type: 'default', tabType: 'chat', pid: 1 },
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
        type: 'default',
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
    moveTab: (state, action: PayloadAction<PatientData>) => {
      //환자탭이 존재할때 : 기존탭에서 찾고 이동
      const index = state.tablist.findIndex((tab) => tab.pid === Number(action.payload.pid));

      //환자탭이 없을때 : 새탭을 만들고 이동
      if (index === -1) {
        const newTab: tab = {
          id: ++state.increment,
          title: `${action.payload.pid} Diagnosis`,
          type: `${action.payload.modality === '' ? 'default' : 'cxr'}`,
          tabType: 'chat',
          pid: Number(action.payload.pid),
        };
        state.tablist.push(newTab);
        state.selectedIndex = state.tablist.length - 1;
      } else {
        if (action.payload.modality === '') {
          state.tablist[index].type = 'default';
        } else state.tablist[index].type = 'cxr';
        state.selectedIndex = index;
      }
    },
  },
});

export const { setSelectedTab, addTab, deleteTab, initialIndex, moveTab } = tabSlices.actions;
export default tabSlices;

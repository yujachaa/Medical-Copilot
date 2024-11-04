import { PluginType } from '@/components/Tabs/Tab';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TabType = 'default' | 'chat';
export type tab = {
  id: number;
  title: string;
  type: PluginType;
  tabType: TabType;
};

type tabProps = {
  tablist: tab[];
  selectedTab: number;
  increment: number;
  selectedIndex: number;
};

const initialState: tabProps = {
  tablist: [{ id: 0, title: 'Default Plugin', type: 'default', tabType: 'default' }],
  selectedTab: 0,
  increment: 0,
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
  },
});

export const { setSelectedTab, addTab, deleteTab, initialIndex } = tabSlices.actions;
export default tabSlices;

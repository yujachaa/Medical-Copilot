import { PluginType } from '@/components/Tabs/Tab';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type tab = {
  id: number;
  title: string;
  type: PluginType;
};

type tabProps = {
  tablist: tab[];
  selectedTab: number;
  increment: number;
  selectedIndex: number;
};

const initialState: tabProps = {
  tablist: [{ id: 0, title: 'Default Plugin', type: 'default' }],
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
      const newTab: tab = { id: ++state.increment, title: `New Tab`, type: 'default' };
      state.selectedIndex = state.tablist.length;
      state.tablist.push(newTab);
    },
    deleteTab: (state, action: PayloadAction<number>) => {
      const index = state.tablist.findIndex((tab) => tab.id === action.payload);
      if (index !== -1) {
        if (index < state.selectedIndex) {
          state.selectedIndex--;
        }
      }
      const temp = state.tablist.filter((tab) => tab.id !== action.payload);
      state.tablist = [...temp];
    },
  },
});

export const { setSelectedTab, addTab, deleteTab } = tabSlices.actions;
export default tabSlices;

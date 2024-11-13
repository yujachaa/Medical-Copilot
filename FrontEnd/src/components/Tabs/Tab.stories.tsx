import type { Meta, StoryObj } from '@storybook/react';
import Tab from './Tab';

const meta = {
  title: 'components/Tab',
  component: Tab,
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  args: {
    HandleDelete: () => console.log('Tab closed'),
    tab: {
      id: 1,
      title: 'MG Plugins',
      type: 'MG',
      tabType: 'default',
      pid: 1,
    },
    isActive: true,
  },
};

export const CXR: Story = {
  args: {
    tab: {
      id: 1,
      title: 'CXR Plugins',
      type: 'CXR',
      tabType: 'default',
      pid: 1,
    },
    isActive: true,
  },
};

export const Capsule: Story = {
  args: {
    HandleDelete: () => console.log('Tab closed'),
    tab: {
      id: 1,
      title: 'CT',
      type: 'CT',
      tabType: 'default',
      pid: 1,
    },
    isActive: true,
  },
};

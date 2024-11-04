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
      title: 'Default Plugins',
      type: 'default',
      tabType: 'default',
    },
    isActive: true,
  },
};

export const CXR: Story = {
  args: {
    tab: {
      id: 1,
      title: 'CXR Plugins',
      type: 'cxr',
      tabType: 'default',
    },
    isActive: true,
  },
};

export const Capsule: Story = {
  args: {
    HandleDelete: () => console.log('Tab closed'),
    tab: {
      id: 1,
      title: 'CapSule',
      type: 'capsule',
      tabType: 'default',
    },
    isActive: true,
  },
};

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
    onClose: () => console.log('Tab closed'),
    text: 'Default Plugins',
    LogoType: 'default',
    isActive: true,
  },
};

export const CXR: Story = {
  args: {
    onClose: () => console.log('Tab closed'),
    text: 'CXR',
    LogoType: 'cxr',
    isActive: true,
  },
};

export const Capsule: Story = {
  args: {
    onClose: () => console.log('Tab closed'),
    text: 'Capsule',
    LogoType: 'capsule',
    isActive: true,
  },
};

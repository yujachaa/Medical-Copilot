import type { Meta, StoryObj } from '@storybook/react';
import Tab from './NewTab';

const meta = {
  title: 'components/AddTab',
  component: Tab,
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  args: {
    onPlus: () => console.log('Tab plus'),
  },
};

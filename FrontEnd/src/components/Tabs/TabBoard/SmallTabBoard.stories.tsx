import type { Meta, StoryObj } from '@storybook/react';
import TabBoard from './TabBoard';
import { Provider } from 'react-redux';
import { store } from '@/redux/store/store';

const meta = {
  title: 'components/SmallTabBoard',
  component: TabBoard,
  parameters: {
    nextjs: {
      appDirectory: true, // 👈 Set this
    },
  },
} satisfies Meta<typeof TabBoard>;

export default meta;

type Story = StoryObj<typeof TabBoard>;

export const Default: Story = {
  render: () => (
    <Provider store={store}>
      <TabBoard />
    </Provider>
  ),
};

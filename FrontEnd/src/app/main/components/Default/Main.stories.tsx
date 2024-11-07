import type { Meta, StoryObj } from '@storybook/react';
import Main from './MainLayout';
import { Provider } from 'react-redux';
import { store } from '@/redux/store/store';

const meta = {
  title: 'components/Main',
  component: Main,
  parameters: {
    nextjs: {
      appDirectory: true, // 👈 Set this
    },
  },
} satisfies Meta<typeof Main>;

export default meta;

type Story = StoryObj<typeof Main>;

export const main: Story = {
  render: () => (
    <Provider store={store}>
      <Main />
    </Provider>
  ),
};

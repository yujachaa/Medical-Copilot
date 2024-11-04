import type { Meta, StoryObj } from '@storybook/react';
import Page from './page';
import { Provider } from 'react-redux';
import { store } from '@/redux/store/store';

const meta = {
  title: 'Pages/Main',
  component: Page,
  parameters: {
    nextjs: {
      appDirectory: true, // 👈 Set this
    },
  },
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof Page>;

export const Main: Story = {
  render: () => (
    <Provider store={store}>
      <Page />
    </Provider>
  ),
};

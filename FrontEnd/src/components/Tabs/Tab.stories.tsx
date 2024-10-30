import type { Meta, StoryObj } from '@storybook/react';
import TabBoard from './TabBoard';

const meta = {
  title: 'components/Tab',
  component: TabBoard,
} satisfies Meta<typeof TabBoard>;

export default meta;

// type Story = StoryObj<typeof TabBoard>;

export const Default = () => <TabBoard />;

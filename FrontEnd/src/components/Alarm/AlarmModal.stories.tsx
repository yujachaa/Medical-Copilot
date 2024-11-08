import type { Meta, StoryObj } from '@storybook/react';
import AlarmModal from './AlarmModal';

const meta = {
  title: 'components/AlarmModal',
  component: AlarmModal,
} satisfies Meta<typeof AlarmModal>;

export default meta;

type Story = StoryObj<typeof AlarmModal>;

export const Default: Story = {
  args: {},
};

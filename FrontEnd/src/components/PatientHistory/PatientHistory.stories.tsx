import type { Meta, StoryObj } from '@storybook/react';
import PatientHistory from './PatientHistory';

const meta = {
  title: 'components/PatientHistory',
  component: PatientHistory,
} satisfies Meta<typeof PatientHistory>;

export default meta;

type Story = StoryObj<typeof PatientHistory>;

export const Main: Story = {};

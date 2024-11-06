import type { Meta, StoryObj } from '@storybook/react';
import PatientHistory from './PatientDB';

const meta = {
  title: 'components/PatientDB',
  component: PatientHistory,
} satisfies Meta<typeof PatientHistory>;

export default meta;

type Story = StoryObj<typeof PatientHistory>;

export const Main: Story = {};

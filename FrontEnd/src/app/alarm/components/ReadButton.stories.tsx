import type { Meta, StoryObj } from '@storybook/react';
import ReadButton from './ReadButton';

const meta = {
  title: 'components/ReadButton',
  component: ReadButton,
} satisfies Meta<typeof ReadButton>;

export default meta;

type Story = StoryObj<typeof ReadButton>;

export const Default: Story = {
  args: {},
};

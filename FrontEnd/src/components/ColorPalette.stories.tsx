import type { Meta, StoryObj } from '@storybook/react';
import ColorPalette from './ColorPalette';

const meta = {
  title: 'Colors',
  component: ColorPalette,
} satisfies Meta<typeof ColorPalette>;

export default meta;

type Story = StoryObj<typeof ColorPalette>;

export const ColorSet: Story = {};

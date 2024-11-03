import type { Meta, StoryObj } from '@storybook/react';
import Page from './page';

const meta = {
  title: 'Pages/Main',
  component: Page,
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof Page>;

export const Main: Story = {};

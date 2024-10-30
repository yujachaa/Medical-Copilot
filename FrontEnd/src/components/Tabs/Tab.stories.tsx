import type { Meta } from '@storybook/react';
import TabBoard from './TabBoard';

const meta = {
  title: 'components/Tab',
  component: TabBoard,
} satisfies Meta<typeof TabBoard>;

export default meta;

export const Default = () => <TabBoard />;

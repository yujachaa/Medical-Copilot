'use client';

import { ResponsivePie } from '@nivo/pie';

const data = [
  {
    id: 'make',
    label: 'make',
    value: 228,
    color: 'hsl(60, 70%, 50%)',
  },
  {
    id: 'rust',
    label: 'rust',
    value: 53,
    color: 'hsl(129, 70%, 50%)',
  },
  {
    id: 'ruby',
    label: 'ruby',
    value: 552,
    color: 'hsl(185, 70%, 50%)',
  },
  {
    id: 'c',
    label: 'c',
    value: 62,
    color: 'hsl(126, 70%, 50%)',
  },
  {
    id: 'scala',
    label: 'scala',
    value: 498,
    color: 'hsl(353, 70%, 50%)',
  },
];

export default function TotalUsageGraph() {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 10, right: 80, bottom: 10, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: 'ruby',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'c',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'go',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'python',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'scala',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'lisp',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'elixir',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'javascript',
          },
          id: 'lines',
        },
      ]}
    />
  );
}

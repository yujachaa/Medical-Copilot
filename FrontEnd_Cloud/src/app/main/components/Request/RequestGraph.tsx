'use client';

const data = [
  {
    id: 'queue',
    color: 'hsl(100, 70%, 50%)',
    data: [
      {
        x: 1,
        y: 0,
      },
      {
        x: 2,
        y: 0,
      },
      {
        x: 3,
        y: 0,
      },
      {
        x: 4,
        y: 0,
      },
      {
        x: 5,
        y: 0,
      },
      {
        x: 6,
        y: 0,
      },
      {
        x: 7,
        y: 0,
      },
      {
        x: 8,
        y: 0,
      },
      {
        x: 9,
        y: 0,
      },
      {
        x: 10,
        y: 0,
      },
      {
        x: 11,
        y: 0,
      },
      {
        x: 12,
        y: 0,
      },
    ],
  },
];

import { useTotalQueue } from '@/hooks/useTotalQueue';
import { ResponsiveLine } from '@nivo/line';
import { useState } from 'react';

type queueList = { id: string; color: string; data: { x: number; y: number }[] }[];

export default function RequestGraph() {
  const [list, setList] = useState<queueList>(data);
  useTotalQueue(setList);
  return (
    <ResponsiveLine
      data={list}
      margin={{ top: 20, right: 90, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: 36,
        legendPosition: 'middle',
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle',
        truncateTickAt: 0,
      }}
      colors={['#a2d2ff']}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}

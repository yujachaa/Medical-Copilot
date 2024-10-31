'use client';

import { ResponsiveLine } from '@nivo/line';
const data = [
  {
    id: 'japan',
    color: 'hsl(166, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 141,
      },
      {
        x: 'helicopter',
        y: 213,
      },
      {
        x: 'boat',
        y: 157,
      },
      {
        x: 'train',
        y: 275,
      },
      {
        x: 'subway',
        y: 56,
      },
      {
        x: 'bus',
        y: 213,
      },
      {
        x: 'car',
        y: 86,
      },
      {
        x: 'moto',
        y: 64,
      },
      {
        x: 'bicycle',
        y: 89,
      },
      {
        x: 'horse',
        y: 80,
      },
      {
        x: 'skateboard',
        y: 206,
      },
      {
        x: 'others',
        y: 112,
      },
    ],
  },
  {
    id: 'france',
    color: 'hsl(155, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 142,
      },
      {
        x: 'helicopter',
        y: 285,
      },
      {
        x: 'boat',
        y: 225,
      },
      {
        x: 'train',
        y: 229,
      },
      {
        x: 'subway',
        y: 121,
      },
      {
        x: 'bus',
        y: 135,
      },
      {
        x: 'car',
        y: 55,
      },
      {
        x: 'moto',
        y: 252,
      },
      {
        x: 'bicycle',
        y: 74,
      },
      {
        x: 'horse',
        y: 140,
      },
      {
        x: 'skateboard',
        y: 138,
      },
      {
        x: 'others',
        y: 75,
      },
    ],
  },
  {
    id: 'us',
    color: 'hsl(251, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 292,
      },
      {
        x: 'helicopter',
        y: 8,
      },
      {
        x: 'boat',
        y: 254,
      },
      {
        x: 'train',
        y: 207,
      },
      {
        x: 'subway',
        y: 62,
      },
      {
        x: 'bus',
        y: 77,
      },
      {
        x: 'car',
        y: 253,
      },
      {
        x: 'moto',
        y: 57,
      },
      {
        x: 'bicycle',
        y: 144,
      },
      {
        x: 'horse',
        y: 107,
      },
      {
        x: 'skateboard',
        y: 154,
      },
      {
        x: 'others',
        y: 226,
      },
    ],
  },
  {
    id: 'germany',
    color: 'hsl(296, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 57,
      },
      {
        x: 'helicopter',
        y: 68,
      },
      {
        x: 'boat',
        y: 277,
      },
      {
        x: 'train',
        y: 85,
      },
      {
        x: 'subway',
        y: 174,
      },
      {
        x: 'bus',
        y: 56,
      },
      {
        x: 'car',
        y: 242,
      },
      {
        x: 'moto',
        y: 8,
      },
      {
        x: 'bicycle',
        y: 110,
      },
      {
        x: 'horse',
        y: 205,
      },
      {
        x: 'skateboard',
        y: 23,
      },
      {
        x: 'others',
        y: 208,
      },
    ],
  },
  {
    id: 'norway',
    color: 'hsl(286, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 32,
      },
      {
        x: 'helicopter',
        y: 288,
      },
      {
        x: 'boat',
        y: 135,
      },
      {
        x: 'train',
        y: 212,
      },
      {
        x: 'subway',
        y: 260,
      },
      {
        x: 'bus',
        y: 281,
      },
      {
        x: 'car',
        y: 145,
      },
      {
        x: 'moto',
        y: 211,
      },
      {
        x: 'bicycle',
        y: 36,
      },
      {
        x: 'horse',
        y: 229,
      },
      {
        x: 'skateboard',
        y: 289,
      },
      {
        x: 'others',
        y: 149,
      },
    ],
  },
];

export default function UsageByModuleGraph() {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
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

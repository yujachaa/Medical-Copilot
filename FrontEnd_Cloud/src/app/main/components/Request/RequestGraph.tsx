'use client';

import { ResponsiveLine } from '@nivo/line';

export default function RequestGraph() {
  const data = [
    {
      id: 'japan',
      color: 'hsl(100, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 222,
        },
        {
          x: 'helicopter',
          y: 74,
        },
        {
          x: 'boat',
          y: 235,
        },
        {
          x: 'train',
          y: 273,
        },
        {
          x: 'subway',
          y: 177,
        },
        {
          x: 'bus',
          y: 109,
        },
        {
          x: 'car',
          y: 176,
        },
        {
          x: 'moto',
          y: 32,
        },
        {
          x: 'bicycle',
          y: 103,
        },
        {
          x: 'horse',
          y: 248,
        },
        {
          x: 'skateboard',
          y: 2,
        },
        {
          x: 'others',
          y: 192,
        },
      ],
    },
    {
      id: 'france',
      color: 'hsl(302, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 242,
        },
        {
          x: 'helicopter',
          y: 94,
        },
        {
          x: 'boat',
          y: 282,
        },
        {
          x: 'train',
          y: 169,
        },
        {
          x: 'subway',
          y: 226,
        },
        {
          x: 'bus',
          y: 34,
        },
        {
          x: 'car',
          y: 0,
        },
        {
          x: 'moto',
          y: 173,
        },
        {
          x: 'bicycle',
          y: 265,
        },
        {
          x: 'horse',
          y: 297,
        },
        {
          x: 'skateboard',
          y: 15,
        },
        {
          x: 'others',
          y: 205,
        },
      ],
    },
    {
      id: 'us',
      color: 'hsl(184, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 251,
        },
        {
          x: 'helicopter',
          y: 134,
        },
        {
          x: 'boat',
          y: 278,
        },
        {
          x: 'train',
          y: 117,
        },
        {
          x: 'subway',
          y: 66,
        },
        {
          x: 'bus',
          y: 92,
        },
        {
          x: 'car',
          y: 280,
        },
        {
          x: 'moto',
          y: 208,
        },
        {
          x: 'bicycle',
          y: 127,
        },
        {
          x: 'horse',
          y: 231,
        },
        {
          x: 'skateboard',
          y: 165,
        },
        {
          x: 'others',
          y: 75,
        },
      ],
    },
    {
      id: 'germany',
      color: 'hsl(267, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 151,
        },
        {
          x: 'helicopter',
          y: 279,
        },
        {
          x: 'boat',
          y: 145,
        },
        {
          x: 'train',
          y: 261,
        },
        {
          x: 'subway',
          y: 266,
        },
        {
          x: 'bus',
          y: 37,
        },
        {
          x: 'car',
          y: 238,
        },
        {
          x: 'moto',
          y: 47,
        },
        {
          x: 'bicycle',
          y: 48,
        },
        {
          x: 'horse',
          y: 82,
        },
        {
          x: 'skateboard',
          y: 291,
        },
        {
          x: 'others',
          y: 195,
        },
      ],
    },
    {
      id: 'norway',
      color: 'hsl(301, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 3,
        },
        {
          x: 'helicopter',
          y: 187,
        },
        {
          x: 'boat',
          y: 43,
        },
        {
          x: 'train',
          y: 215,
        },
        {
          x: 'subway',
          y: 240,
        },
        {
          x: 'bus',
          y: 214,
        },
        {
          x: 'car',
          y: 58,
        },
        {
          x: 'moto',
          y: 80,
        },
        {
          x: 'bicycle',
          y: 17,
        },
        {
          x: 'horse',
          y: 61,
        },
        {
          x: 'skateboard',
          y: 285,
        },
        {
          x: 'others',
          y: 130,
        },
      ],
    },
  ];
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 90, bottom: 50, left: 60 }}
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

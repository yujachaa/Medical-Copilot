'use client';

import { ResponsiveLine } from '@nivo/line';

export default function UsageByModuleGraph({
  list,
}: {
  list: { id: string; color: string; data: { x: string; y: number }[] }[];
}) {
  const tooltipStyle = {
    background: 'white',
    color: 'inherit',
    fontSize: 'inherit',
    borderRadius: '2px',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 1px 2px',
    padding: '5px 9px',
  };

  return (
    <>
      {list.length > 0 && (
        <ResponsiveLine
          data={list}
          margin={{ top: 20, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            stacked: false,
            reverse: false,
            // min: 0,
            // max: 100,
          }}
          yFormat=" >-.0f"
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
          colors={['#a2d2ff', '#ffafcc', '#457b9d']}
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
              symbolShape: 'diamond',
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
          tooltip={(item) => {
            return (
              <div style={tooltipStyle}>
                <b>
                  {item.point.id.startsWith('c') ? 'CXR' : 'MG'} : {item.point.data.yFormatted}
                </b>
              </div>
            );
          }}
        />
      )}
    </>
  );
}

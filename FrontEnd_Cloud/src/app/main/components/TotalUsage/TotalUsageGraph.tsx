'use client';

import { useTotalUsage } from '@/hooks/useTotalUsage';
import { ResponsivePie } from '@nivo/pie';

export default function TotalUsageGraph() {
  const { list } = useTotalUsage();

  const tooltipStyle = {
    background: 'white',
    color: 'inherit',
    fontSize: 'inherit',
    borderRadius: '2px',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 1px 2px',
    padding: '5px 9px',
  };
  return (
    <ResponsivePie
      data={list}
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
      colors={['#a2d2ff', '#ffafcc', '#457b9d']}
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
      tooltip={(item) => {
        return (
          <div style={tooltipStyle}>
            <b>
              {item.datum.data.id.startsWith('c') ? 'CXR' : 'MG'} : {item.datum.value}
            </b>
          </div>
        );
      }}
    />
  );
}

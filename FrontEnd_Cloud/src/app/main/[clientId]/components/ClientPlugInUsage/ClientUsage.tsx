'use client';

import { useClientUsage } from '@/hooks/useClientUsage';
import { ResponsivePie } from '@nivo/pie';

export default function ClientUsage({
  standard,
  serialKey,
}: {
  standard: number;
  serialKey: string;
}) {
  const { list } = useClientUsage(standard, serialKey);
  console.log(list);
  if (list.every((object) => object.value === 0)) {
    return <div>No usage data available.</div>;
  }
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
      colors={['#a2d2ff', '#ffafcc', '#457b9d']}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
    />
  );
}

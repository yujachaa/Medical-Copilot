import { Patient } from '@/redux/features/main/mainSlice';
import React from 'react';

type Props = {
  data: Patient;
};

export default function Modality({ data }: Props) {
  return <div>{data.age}</div>;
}

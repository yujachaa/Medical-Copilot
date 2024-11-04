'use client';
import { useAppSelector } from '@/redux/store/hooks/store';
import { redirect } from 'next/navigation';

type Props = {
  id: string;
};
export default function CheckIndex({ id }: Props) {
  const { tablist } = useAppSelector((state) => state.tab);

  if (!id && tablist.length > 0) {
    redirect(`/main/${tablist[0].id}`);
  }

  return null;
}

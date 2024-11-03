import React from 'react';
import styles from './Tab.module.scss';
import { CgClose } from 'react-icons/cg';
import SelectTabIcons from './components/SelectTabIcons';
import { tab } from '@/redux/features/tab/tabSlice';
import Link from 'next/link';
export type PluginType = 'default' | 'cxr' | 'capsule';

type TabProps = {
  HandleDelete: (id: number) => void;
  onClick: () => void;
  tab: tab;
  isActive: boolean;
};

export default function Tab({ HandleDelete, onClick, tab, isActive }: TabProps) {
  const { id, type = 'default', title } = tab;
  const handleDelete = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    HandleDelete(id);
  };
  return (
    <Link
      className={` ${styles.tab} ${isActive === true && styles.active}`}
      href={`/main/${tab.id}`}
      prefetch={true}
      onClick={onClick}
    >
      <SelectTabIcons logoType={type} className={"w-8 h-8"}/>
      <p>{title}</p>
      <CgClose
        className="w-5 h-5 ml-auto cursor-pointer text-rgb0.5"
        onClick={handleDelete}
      />
    </Link>
  );
}

import React from 'react';
import styles from './Tab.module.scss';
import { CgClose } from '@react-icons/all-files/cg/CgClose';
import SelectTabIcons from './components/SelectTabIcons';
import { tab } from '@/redux/features/tab/tabSlice';
import Link from 'next/link';
export type PluginType = 'MG' | 'CXR' | 'CT';

type TabProps = {
  HandleDelete: (id: number) => void;
  tab: tab;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: number) => void;
};

export default function Tab({ HandleDelete, tab, isActive, onClick }: TabProps) {
  const { id, type = 'MG', title } = tab;
  const handleDelete = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    e.preventDefault();
    HandleDelete(id);
  };
  return (
    <Link
      href={`${tab.pathname}`}
      className={` ${styles.tab} ${isActive === true && styles.active}`}
      onClick={(e) => onClick(e, tab.id)}
    >
      <SelectTabIcons
        logoType={type}
        className={'w-8 h-8'}
      />
      <p>{title}</p>
      <CgClose
        className="w-5 h-5 ml-auto cursor-pointer text-rgb0.5"
        onClick={handleDelete}
      />
    </Link>
  );
}

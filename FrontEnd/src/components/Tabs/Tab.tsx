import React from 'react';
import styles from './Tab.module.scss';
import { CgClose } from 'react-icons/cg';
import SelectTabIcons from './components/SelectTabIcons';
import { tab } from '@/redux/features/tab/tabSlice';

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
    <div
      className={` ${styles.tab} ${isActive === true && styles.active}`}
      onClick={onClick}
    >
      {SelectTabIcons(type)}
      <p>{title}</p>
      <CgClose
        className="w-5 h-5 ml-auto cursor-pointer text-rgb0.5"
        onClick={handleDelete}
      />
    </div>
  );
}

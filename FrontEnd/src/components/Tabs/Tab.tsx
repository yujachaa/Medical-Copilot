import React from 'react';
import styles from './Tab.module.scss';
import { CgClose } from 'react-icons/cg';
import SelectTabIcons from './components/SelectTabIcons';

export type PluginType = 'default' | 'cxr' | 'capsule';

type TabProps = {
  onClose: () => void;
  text: string;
  LogoType: PluginType;
  isActive: boolean;
};

export default function Tab({ onClose, text, LogoType = 'default', isActive }: TabProps) {
  return (
    <div className={` ${styles.tab} ${isActive === true && styles.active}`}>
      {SelectTabIcons(LogoType)}
      <p>{text}</p>
      <CgClose
        className="w-5 h-5 ml-auto mr-4 cursor-pointer text-rgb0.5"
        onClick={onClose}
      />
    </div>
  );
}

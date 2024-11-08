import React from 'react';
import styles from './AlarmModal.module.scss';
import Item from '@/components/Alarm/components/Item';
import { IoMdCloseCircleOutline } from 'react-icons/io';

type Props = {
  onClose?: () => void;
};
export default function AlarmModal({ onClose }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.top}>
          <div className={styles.title}>Notification</div>

          <div className={styles.readbtn}>Read All</div>
          <IoMdCloseCircleOutline
            onClick={onClose}
            className={` ${styles.close} cursor-pointer ml-auto`}
          />
        </div>

        <div className={styles.item_box}>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item className="read" />
        </div>
      </div>
    </div>
  );
}

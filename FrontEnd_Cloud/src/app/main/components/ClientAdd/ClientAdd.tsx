'use client';

import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
import styles from './ClientAdd.module.scss';
import { IoCloseOutline } from 'react-icons/io5';
import { setClientAddModal } from '@/redux/features/modal/modalSlice';

export default function ClientAdd() {
  const isOpenModal = useAppSelector((state) => state.modal.clientAdd);
  const dispatch = useAppDispatch();
  if (!isOpenModal) return null;

  return (
    <div className={`${styles.main} fixed w-full h-full flex justify-center items-center`}>
      <div
        className={`${styles.addBox} flex flex-col w-[400px] h-[50%] min-h-[300px] max-h-[400px] rounded-[20]`}
      >
        <div
          className={`${styles.title} flex h-[80px] justify-between items-center pl-6 pr-6 rounded-se-[20] rounded-ss-[20]`}
        >
          <span>Add Client</span>
          <IoCloseOutline
            className={`cursor-pointer`}
            onClick={() => {
              dispatch(setClientAddModal());
            }}
          />
        </div>
        <div className={`${styles.inputs} flex flex-col pl-6 pr-6 pt-5 gap-3 relative`}>
          <div className={`${styles.input} flex flex-col`}>
            <span className={`${styles.inputTitle}`}>Client Name</span>
            <input
              className={`${styles.name} h-[50px] rounded-[10] pl-4`}
              placeholder="Client Name"
              type="text"
            />
          </div>
          <div className={`${styles.input} flex flex-col`}>
            <span className={`${styles.inputTitle}`}>Plan</span>
            <select className={`${styles.plan} h-[50px] pl-4 rounded-[10]`}>
              <option>default - 50tokens</option>
              <option>silber - 100tokens</option>
              <option>gold - 200tokens</option>
              <option>platinum - 500tokens</option>
            </select>
          </div>
          <div
            className={`${styles.btns} flex h-fit justify-end absolute bottom-0 right-[24] gap-3 text-white`}
          >
            <button
              className={`${styles.add} flex justify-center items-center w-[80] h-[40] rounded-[10] cursor-pointer`}
            >
              Add
            </button>
            <button
              className={`${styles.cancel} flex justify-center items-center w-[80] h-[40] rounded-[10] cursor-pointer`}
              onClick={() => {
                dispatch(setClientAddModal());
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

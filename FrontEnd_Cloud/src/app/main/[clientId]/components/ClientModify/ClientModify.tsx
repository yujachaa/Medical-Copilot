'use client';

import { useAppDispatch } from '@/redux/store/hooks/store';
import styles from './ClientModify.module.scss';
import { IoCloseOutline } from 'react-icons/io5';
import { setClientModifyModal } from '@/redux/features/modal/modalSlice';
import { useCallback, useState } from 'react';
import { clientDetail } from '@/types/client';
import { fetchClientModify } from '@/apis/fetchClientModify';

export default function ClientModify({ clientDetail }: { clientDetail: clientDetail }) {
  const dispatch = useAppDispatch();
  const [comName, setComName] = useState<string>(clientDetail.comName);
  const [grade, setGrade] = useState<string>(clientDetail.grade);

  const handleModifyClient = useCallback(async () => {
    const data = await fetchClientModify(clientDetail.key, comName, grade);
    if (data) {
      dispatch(setClientModifyModal());
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, [clientDetail.key, comName, grade, dispatch]);

  return (
    <div className={`${styles.main} fixed w-full h-full flex justify-center items-center`}>
      <div
        className={`${styles.addBox} flex flex-col w-[400px] h-[50%] min-h-[400px] max-h-[500px] rounded-[20px]`}
      >
        <div
          className={`${styles.title} flex h-[80px] justify-between items-center pl-6 pr-6 rounded-se-[20px] rounded-ss-[20px]`}
        >
          <span>Modify Client</span>
          <IoCloseOutline
            className={`cursor-pointer`}
            onClick={() => {
              dispatch(setClientModifyModal());
            }}
          />
        </div>
        <div className={`${styles.inputs} flex flex-col pl-6 pr-6 pt-5 gap-3 relative`}>
          <div className={`${styles.input} flex flex-col`}>
            <span className={`${styles.inputTitle}`}>Client Name</span>
            <input
              className={`${styles.name} h-[50px] rounded-[10px] pl-4`}
              placeholder="Client Name"
              type="text"
              value={comName}
              onChange={(event) => {
                setComName(event.target.value);
              }}
            />
          </div>
          <div className={`${styles.input} flex flex-col`}>
            <span className={`${styles.inputTitle}`}>Plan</span>
            <select
              className={`${styles.plan} h-[50px] pl-4 rounded-[10px]`}
              onChange={(event) => {
                setGrade(event.target.value);
              }}
            >
              <option
                value={'DEFAULT'}
                selected
              >
                선택해주세요
              </option>
              <option value={'DEFAULT'}>default - 50tokens</option>
              <option value={'SILVER'}>silber - 100tokens</option>
              <option value={'GOLD'}>gold - 200tokens</option>
              <option value={'PLATINUM'}>platinum - 500tokens</option>
            </select>
          </div>
          <div
            className={`${styles.btns} flex h-fit justify-end absolute bottom-0 right-[24px] gap-3 text-white`}
          >
            <button
              className={`${styles.add} flex justify-center items-center w-[80px] h-[40px] rounded-[10px] cursor-pointer`}
              onClick={() => {
                handleModifyClient();
              }}
            >
              Modify
            </button>
            <button
              className={`${styles.cancel} flex justify-center items-center w-[80px] h-[40px] rounded-[10px] cursor-pointer`}
              onClick={() => {
                dispatch(setClientModifyModal());
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

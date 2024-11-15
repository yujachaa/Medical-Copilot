import { useCallback } from 'react';
import styles from './WarningModal.module.scss';
import { RiErrorWarningLine } from 'react-icons/ri';
import { fetchLimit } from '@/apis/fetchLimit';
import { clientDetail } from '@/types/client';
import { useAppDispatch } from '@/redux/store/hooks/store';
import { setWarningModal } from '@/redux/features/modal/modalSlice';

export default function WarningModal({ clientDetail }: { clientDetail: clientDetail }) {
  const dispatch = useAppDispatch();
  const handleFetchStop = useCallback(async () => {
    const data = await fetchLimit(clientDetail.key);
    if (data && data.msg === 'success') {
      window.location.reload();
    }
  }, [clientDetail.key]);

  return (
    <div
      className={`${styles.main} w-screen h-screen fixed top-0 flex justify-center items-center`}
    >
      <div className={`${styles.box} flex w-[490px] h-fit p-6 rounded-[20px]`}>
        <RiErrorWarningLine className={`w-[200px] ${styles.mark} text-[48px] mt-2`} />
        <div className={`flex flex-col pl-4`}>
          <span className={`${styles.warning} text-[40px]`}>Warning</span>
          <span className={`${styles.content} text-[20px]`}>
            Are you sure you want to suspend this serial key? This action will prevent the user from
            accessing their services and cannot be easily undone.
          </span>
          <div className={`${styles.btns} flex justify-end gap-3 mt-3 mr-5`}>
            <button
              onClick={() => {
                dispatch(setWarningModal());
                handleFetchStop();
              }}
            >
              Stop
            </button>
            <button
              onClick={() => {
                dispatch(setWarningModal());
              }}
            >
              Cancle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import styles from './ReportData.module.scss';
import { TbEdit } from 'react-icons/tb';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks/store';
import { updateReportData } from '@/redux/features/report/reportSlice';

export default function Diagnosis() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isEditable, setIsEditable] = useState(false); // 수정 가능 여부 상태
  const dispatch = useAppDispatch();
  const { reportData } = useAppSelector((state) => state.report);

  // 화면 크기를 감지하여 상태를 업데이트하는 로직
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1024);
    };

    handleResize(); // 초기 상태 설정
    window.addEventListener('resize', handleResize); // 리사이즈 이벤트 추가

    return () => window.removeEventListener('resize', handleResize); // 이벤트 클린업
  }, []);

  // 입력값 변경 시 dispatch로 상태 업데이트
  const handleChange = (field: string, value: string) => {
    dispatch(updateReportData({ [field]: value }));
  };

  // 수정 모드 토글 함수
  const toggleEditMode = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className={`${styles.info}`}>
      <div>Diagnosis</div>
      <div className={styles.infoBox}>
        {/* Labels 필드 */}
        <div className="w-full">
          <div className={styles.oneInfo}>
            <div className="text-white flex-grow max-1024:text-sm">• Labels</div>
            <div className="flex gap-[2px]">
              <div className="text-white">|</div>
              <input
                className={styles.infoInput}
                value={reportData?.disease || ''}
                readOnly={!isEditable} // 수정 가능 여부에 따라 readOnly 설정
                onChange={(e) => handleChange('disease', e.target.value)}
              />
            </div>
          </div>
          {isSmallScreen && <hr className="absolute top-1/2" />}
        </div>

        {/* Location 필드 */}
        <div className="w-full">
          <div className={styles.oneInfo}>
            <div className="text-white flex-grow max-1024:text-sm">• Location</div>
            <div className="flex gap-[2px]">
              <div className="text-white">|</div>
              <input
                className={styles.infoInput}
                value={reportData?.location || ''}
                readOnly={!isEditable}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </div>
          </div>
          {isSmallScreen && <hr className="absolute top-1/2" />}
        </div>

        {/* Size 필드 */}
        <div className="w-full">
          <div className={styles.oneInfo}>
            <div className="text-white flex-grow max-1024:text-sm">• Size</div>
            <div className="flex gap-[2px]">
              <div className="text-white">|</div>
              <input
                className={styles.infoInput}
                value={reportData?.size || ''}
                readOnly={!isEditable}
                onChange={(e) => handleChange('size', e.target.value)}
              />
            </div>
          </div>
          {isSmallScreen && <hr className="absolute top-1/2" />}
        </div>

        {/* Symptoms 필드 */}
        <div className="w-full">
          <div className={styles.oneInfo}>
            <div className="text-white flex-grow max-1024:text-sm">• Symptoms</div>
            <div className="flex gap-[2px]">
              <div className="text-white">|</div>
              <input
                className={styles.infoInput}
                value={reportData?.symptoms || ''}
                readOnly={!isEditable}
                onChange={(e) => handleChange('symptoms', e.target.value)}
              />
            </div>
          </div>
          {isSmallScreen && <hr className="absolute top-1/2" />}
        </div>
      </div>

      <div
        className={`${styles.editorBtn} ${isEditable ? styles.active : ''}`}
        onClick={toggleEditMode}
      >
        <TbEdit />
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import styles from './ReportData.module.scss';
import { useAppSelector } from '@/redux/store/hooks/store';

export default function PatientInfo() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
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

  return (
    <div className={`${styles.info}`}>
      <div>Patient Information</div>
      <div className={styles.infoBox}>
        {['Patient ID', 'Sex', 'Age', 'Shooting Date'].map((label, index) => {
          let value = ''; // 기본값 설정
          if (reportData) {
            // reportData가 있을 때 각 label에 맞는 값을 설정
            if (label === 'Patient ID') value = reportData.pid;
            else if (label === 'Sex') value = reportData.sex || '';
            else if (label === 'Age') value = reportData.age.toString();
            else if (label === 'Shooting Date') value = reportData.shootingDate;
          }

          return (
            <div
              key={index}
              className="w-full"
            >
              <div className={styles.oneInfo}>
                <div
                  className={`text-white flex-grow max-1024:text-sm ${
                    label === 'Shooting Date' ? 'tracking-[-.075em]' : ''
                  }`}
                >
                  • {label}
                </div>
                <div className="flex gap-[2px]">
                  <div className="text-white">|</div>
                  <input
                    className={styles.infoInput}
                    value={value} // 각 데이터 값을 value에 할당
                    readOnly // 입력 필드가 수정되지 않도록 readOnly 속성 추가
                  />
                </div>
              </div>
              {isSmallScreen
                ? index === 0 && <hr className="absolute top-1/2" /> // 작은 화면에서는 1번과 3번 항목 밑에만 hr 추가
                : index < 3 && <hr />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

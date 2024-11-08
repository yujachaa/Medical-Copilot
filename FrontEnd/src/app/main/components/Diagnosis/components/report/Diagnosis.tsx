'use client';

import { useEffect, useState } from 'react';
import styles from './ReportData.module.scss';
import { TbEdit } from 'react-icons/tb';

export default function Diagnosis() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
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
      <div>Diagnosis</div>
      <div className={styles.infoBox}>
        {['Labels', 'Location', 'Size', 'Symptoms'].map((label, index) => (
          <div
            key={index}
            className="w-full"
          >
            <div className={styles.oneInfo}>
              <div className="text-white flex-grow max-1024:text-sm">• {label}</div>
              <div className="flex gap-[2px]">
                <div className="text-white">|</div>
                <input className={`${styles.infoInput}`} />
              </div>
            </div>
            {/* 화면 크기에 따라 hr 추가 로직 다르게 설정 */}
            {isSmallScreen
              ? index === 0 && <hr className="absolute top-1/2" /> // 작은 화면에서는 1번과 3번 항목 밑에만 hr 추가
              : index < 3 && <hr />}
          </div>
        ))}
      </div>

      <div className={styles.editorBtn}>
        <TbEdit />
      </div>
    </div>
  );
}

import { useState } from 'react';
import { TbEdit } from 'react-icons/tb';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks/store';
import { updateReportData } from '@/redux/features/report/reportSlice';
import styles from './ReportData.module.scss';

export default function Summary() {
  const dispatch = useAppDispatch();
  const { reportData } = useAppSelector((state) => state.report); // Redux에서 summary 가져오기
  const [isEditable, setIsEditable] = useState(false); // 편집 가능 여부 상태
  const [localSummary, setLocalSummary] = useState(reportData?.summary || ''); // 로컬 상태로 summary 저장

  // 편집 모드 토글
  const toggleEditMode = () => {
    setIsEditable(!isEditable);
    if (isEditable) {
      // 편집이 완료되면 Redux 상태 업데이트
      dispatch(updateReportData({ summary: localSummary }));
    }
  };

  // 텍스트 변경 시 로컬 상태 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalSummary(e.target.value);
  };

  return (
    <div className="w-full">
      <div className={`${styles.summary} ${isEditable ? styles.active : ''}`}>
        <div>Brief Summary</div>
        <div className={styles.summaryText}>
          <textarea
            className={`${styles.summaryTextArea} ${isEditable ? styles.active : ''}`} // active 클래스 적용
            value={localSummary}
            onChange={handleChange}
            readOnly={!isEditable} // isEditable 상태에 따라 읽기 전용/편집 가능 설정
          />
        </div>
        <div
          className={`${styles.editorBtn} ${isEditable ? styles.active : ''}`}
          onClick={toggleEditMode}
        >
          <TbEdit />
        </div>
      </div>
    </div>
  );
}

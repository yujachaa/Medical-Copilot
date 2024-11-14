import { useState, useRef, useEffect } from 'react';
import { TbEdit } from 'react-icons/tb';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks/store';
import { updateReportData } from '@/redux/features/report/reportSlice';
import styles from './ReportData.module.scss';

export default function Summary() {
  const dispatch = useAppDispatch();
  const { reportData } = useAppSelector((state) => state.report);
  const [isEditable, setIsEditable] = useState(false);
  const [localSummary, setLocalSummary] = useState(reportData?.summary);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 편집 모드 토글
  const toggleEditMode = () => {
    setIsEditable(!isEditable);
    if (isEditable) {
      dispatch(updateReportData({ summary: localSummary }));
    }
  };

  // 텍스트 변경 시 로컬 상태 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalSummary(e.target.value);
  };

  // 높이를 자동으로 조절하는 함수
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 높이를 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 스크롤 높이만큼 설정
    }
  };

  useEffect(() => {
    adjustTextareaHeight(); // 초기 로드 시 높이 조절
    console.log(localSummary);
  }, [localSummary]);

  return (
    <div className="w-full">
      <div className={`${styles.summary} ${isEditable ? styles.active : ''}`}>
        <div>Brief Summary</div>
        <div className={styles.summaryText}>
          <textarea
            ref={textareaRef}
            className={`${styles.summaryTextArea} ${isEditable ? styles.active : ''}`}
            value={localSummary}
            onChange={(e) => {
              handleChange(e);
              adjustTextareaHeight(); // 높이 조절 함수 호출
            }}
            readOnly={!isEditable}
            style={{ overflow: 'hidden' }} // 스크롤 숨기기
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

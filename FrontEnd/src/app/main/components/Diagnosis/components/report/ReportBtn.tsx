'use client';

import { useState } from 'react';
import ExportModal from './ExportModal';
import { useAppSelector } from '@/redux/store/hooks/store';
import { updateDrawing, updateReport } from '@/apis/report';

export default function ReportBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { reportData } = useAppSelector((state) => state.report);
  const { coordinates } = useAppSelector((state) => state.coordinate);

  const saveEdit = async () => {
    if (reportData) {
      try {
        // updateReport 호출 시 Redux 상태의 값을 전달
        const response = await updateReport(reportData.id, {
          disease: reportData.disease || '',
          location: reportData.location,
          size: reportData.size,
          symptoms: reportData.symptoms,
          summary: reportData.summary,
        });
        console.log('리포트 업데이트 성공:', response);
      } catch (error) {
        console.log('리포트 업데이트 실패:', error);
      }
      if (coordinates) {
        try {
          // updateReport 호출 시 Redux 상태의 값을 전달
          const response = await updateDrawing(reportData.id, coordinates);
          console.log('그림 업데이트 성공:', response);
        } catch (error) {
          console.log('그림 업데이트 실패:', error);
        }
      }
    }
  };

  return (
    <>
      <div className="flex-grow flex justify-end items-center gap-3 font-bold">
        <button
          className="outline outline-blue-btn text-blue-btn px-2 py-1 rounded-md hover:text-white hover:bg-blue-btn"
          onClick={saveEdit}
        >
          Save
        </button>
        <button
          className="outline outline-save text-save hover:bg-save hover:text-white px-2 py-1 rounded-md"
          onClick={openModal}
        >
          Export Report
        </button>
      </div>

      {isModalOpen && <ExportModal onClose={closeModal} />}
    </>
  );
}

'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useAppSelector } from '@/redux/store/hooks/store';
import { updateDrawing, updateReport } from '@/apis/report';
import { MessageType } from '../../ChatLayout';
const ExportModal = dynamic(() => import('./ExportModal'));

export default function ReportBtn({ messagelist }: { messagelist: MessageType[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { reportData } = useAppSelector((state) => state.report);
  const { coordinates } = useAppSelector((state) => state.coordinate);

  const saveEdit = async () => {
    let isReportUpdated = false;
    let isDrawingUpdated = false;

    if (reportData) {
      try {
        // updateReport 호출 시 Redux 상태의 값을 전달
        await updateReport(reportData.id, {
          disease: reportData.disease || '',
          location: reportData.location,
          size: reportData.size,
          symptoms: reportData.symptoms,
          summary: reportData.summary,
        });
        isReportUpdated = true;
      } catch (error) {
        console.log('리포트 업데이트 실패:', error);
      }
      if (coordinates) {
        try {
          // updateReport 호출 시 Redux 상태의 값을 전달
          updateDrawing(reportData.id, coordinates);
          isDrawingUpdated = true;
        } catch (error) {
          console.log('그림 업데이트 실패:', error);
        }
      }
    }

    if (isReportUpdated && isDrawingUpdated) {
      alert('리포트가 수정되었습니다.');
    } else {
      alert('리포트 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <div className="flex-grow flex justify-end items-center gap-3 font-bold">
        <button
          className="outline outline-blue-btn text-blue-btn px-2 py-1 rounded-md hover:text-white hover:bg-blue-btn"
          onClick={saveEdit}
          aria-label="save"
        >
          Save
        </button>
        <button
          aria-label="export report"
          className="outline outline-save text-save hover:bg-save hover:text-white px-2 py-1 rounded-md"
          onClick={openModal}
        >
          Export Report
        </button>
      </div>

      {isModalOpen && (
        <ExportModal
          messagelist={messagelist}
          onClose={closeModal}
        />
      )}
    </>
  );
}

'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
const ExportModal = dynamic(() => import('./ExportModal'));

export default function ReportBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <div className="flex-grow flex justify-end items-center gap-3 font-bold">
        <button
          aria-label="save"
          className="outline outline-blue-btn text-blue-btn px-2 py-1 rounded-md hover:text-white hover:bg-blue-btn"
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

      {isModalOpen && <ExportModal onClose={closeModal} />}
    </>
  );
}

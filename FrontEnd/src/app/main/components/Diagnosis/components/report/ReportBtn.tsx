'use client';

import { useState } from 'react';
import ExportModal from './ExportModal';

export default function ReportBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <div className="flex-grow flex justify-end items-center gap-3 font-bold">
        <button className="outline outline-blue-btn text-blue-btn px-2 py-1 rounded-md hover:text-white hover:bg-blue-btn">
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

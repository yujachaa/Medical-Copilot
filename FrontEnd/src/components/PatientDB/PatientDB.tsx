'use client';

import styles from './PatientDB.module.scss';
import { FaDatabase } from 'react-icons/fa6';
import { FaSortDown } from 'react-icons/fa';
import { FaSortUp } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchPatient } from '@/apis/main';
import { useAppDispatch } from '@/redux/store/hooks/store';
import { setPatient } from '@/redux/features/main/mainSlice';
// import { FaSortUp } from "react-icons/fa";

type Props = {
  onClose: () => void;
};
type Patient = {
  sex: 'FEMALE' | 'MALE';
  age: number;
  visitDate: string;
  pid: string;
  modality: string;
};

export default function PatientDB({ onClose }: Props) {
  const loader = useRef<HTMLDivElement | null>(null);
  const [patientList, setPatientList] = useState<Patient[]>([]);
  const [size] = useState<number>(8);
  const [page, setPage] = useState(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getPatient = async () => {
      try {
        const response = await fetchPatient(page, size);
        console.log(response);
        if (response.content === undefined) {
          new Error('Response 데이터가 이상합니다');
          return;
        }
        setPatientList((prev) => [...prev, ...response.content]);
      } catch (err: unknown) {
        console.log(err);
      }
    };
    getPatient();
  }, [page, size]);

  const handleSetPatient = (data: Patient) => {
    dispatch(setPatient(data));
    onClose();
  };

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <div className={`${styles.main} fixed w-full h-full flex justify-center items-center`}>
      <div
        className={`${styles.box} w-[50%] min-w-[490px] h-[60%] min-h-[350px] rounded-[20px] flex flex-col p-6 gap-3`}
      >
        <div className={`${styles.title} flex items-center justify-between gap-4 pr-4 pl-4`}>
          <div className={`flex items-center gap-4`}>
            <FaDatabase className={styles.dbIcon} />
            <span>Patient Database</span>
          </div>
          <IoMdCloseCircleOutline
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <div className={`${styles.table} justify-centerw-full h-full pl-4 pr-4`}>
          <table className={`w-full`}>
            <thead>
              <tr>
                <th className="flex justify-center items-center w-[100%] h-full gap-1">
                  <span>PID</span>
                  <FaSortUp />
                  <FaSortDown className={`${styles.down} flex justify-center items-center`} />
                </th>
                <th className="w-[12.5%]">SEX</th>
                <th className="w-[12.5%]">AGE</th>
                <th className="w-[30%]">Modality</th>
                <th className="flex justify-center items-center w-[100%] h-full gap-1">
                  <span>Visit Date</span>
                  <FaSortDown className={`${styles.down} flex justify-center items-center`} />
                </th>
              </tr>
            </thead>
            <tbody>
              {patientList.map((patient, index) => (
                <tr
                  key={index}
                  onClick={() => handleSetPatient(patient)}
                >
                  <td>{patient.pid}</td>
                  <td>{patient.sex}</td>
                  <td>{patient.age}</td>
                  <td>{patient.modality}</td>
                  <td>{patient.visitDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className="w-4 h-4"
            ref={loader}
          ></div>
        </div>
      </div>
    </div>
  );
}

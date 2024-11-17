import styles from './page.module.scss';
import Image from 'next/image';
import RectangleOverlayPdf from '../RectangleOverlayPdf';
import { fetchReport } from '@/apis/report';
import { fetchfip } from '@/apis/fip';
import { ReportDataType } from '@/types/report';

export default async function PDFPage({ params }: { params: { reportId: string } }) {
  const reportData: ReportDataType = await fetchReport(params.reportId);
  const fip = await fetchfip(params.reportId);
  console.log(fip);
  console.log(params.reportId);
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

  return (
    <div className={styles.report}>
      <div className="font-bold text-3xl w-full">Medical Report</div>
      <div className={styles.infoArea}>
        <div className={`${styles.info}`}>
          <div className="font-bold text-lg">Patient Information</div>
          <div className={styles.infoBox}>
            {['Patient ID', 'Sex', 'Age', 'Visit Date'].map((label, index) => {
              let value = ''; // 기본값 설정
              if (reportData) {
                // reportData가 있을 때 각 label에 맞는 값을 설정
                if (label === 'Patient ID') value = reportData.pid;
                else if (label === 'Sex') value = reportData.sex || '';
                else if (label === 'Age') value = reportData.age.toString();
                else if (label === 'Visit Date') value = reportData.shootingDate;
              }

              return (
                <div
                  key={index}
                  className="w-full"
                >
                  <div className={styles.oneInfo}>
                    <div
                      id="element-id"
                      // className={`font-bold w-1/2 ${label === 'Visit Date' ? 'tracking-tighter max-1024:tracking-[-.13em]' : ''} max-1024:text-sm max-1024:w-1/2`}
                      className={`font-bold w-[40%] max-1024:text-sm`}
                    >
                      {label}
                    </div>
                    <div className="flex gap-[2px]">
                      <div className="">:</div>
                      <div className="max-1024:text-sm">{value}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={`${styles.info}`}>
          <div className="font-bold text-lg">Diagnosis</div>
          <div className={styles.infoBox}>
            {['Disease', 'Location', 'Size'].map((label, index) => {
              let value = ''; // 기본값 설정
              if (reportData) {
                // reportData가 있을 때 각 label에 맞는 값을 설정
                if (label === 'Disease') value = reportData.disease || '';
                else if (label === 'Location') value = reportData.location || '';
                else if (label === 'Size') value = reportData.size;
              }

              return (
                <div
                  key={index}
                  className="w-full"
                >
                  <div className={styles.oneInfo}>
                    <div className={`font-bold w-[40%] max-1024:text-sm`}>{label}</div>
                    <div className="flex gap-[2px]">
                      <div className="">:</div>
                      <div className="max-1024:text-sm">{value}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.image}>
          {reportData && (
            <Image
              src={reportData.imageUrl} // 기본 이미지 URL 설정
              alt="이미지"
              width={250}
              height={250}
              priority
            />
          )}
          <RectangleOverlayPdf reportData={reportData} />
        </div>
      </div>

      <div className={`${styles.analysisArea} flex flex-col gap-7`}>
        {fip.find !== '' && (
          <div className={styles.field}>
            <div className="font-bold text-lg">Finding</div>
            <div className={styles.analysisBox}>{fip.find}</div>
          </div>
        )}

        {fip.impression !== '' && (
          <div className={styles.field}>
            <div className="font-bold text-lg">Impression</div>
            <div className={styles.analysisBox}>{fip.impression}</div>
          </div>
        )}

        {fip.plan !== '' && (
          <div className={styles.field}>
            <div className="font-bold text-lg">Plan</div>
            <div className={styles.analysisBox}>{fip.plan}</div>
          </div>
        )}
      </div>
    </div>
  );
}

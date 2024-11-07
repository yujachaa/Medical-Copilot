'use client';

import { useRef } from 'react';
import XrayImg from '@/assets/images/xrayImg.jpg';
import styles from './page.module.scss';
import Image from 'next/image';

export default function PDFPage() {
  const pdfRef = useRef<HTMLDivElement | null>(null);

  const plan = `Imaging : Perform a chest CT to futher evaluate the extent and cause of atelectasis,
                identifying any obstructive or compressive factors. Monitoring : Repeat chest
                imaging as clinically indicated to assess for resolution or progression of
                atelectasis.`;
  const immpression = `Right center lobe atelectasis, potentially due to bronchial obstruction (e.g., mucus
                plug, external compression by a nearby mass, or airway narrowing).`;

  const finding = `Increased opacity in the right lung zone, consistent with partial collapse or
                insufficient expansion of the ceter to the right. No significant shift of
                mediastinal structures, indicating that the atelectasis is likely due to an
                obstructive or compressive process rather than volume loss.`;

  return (
    <div
      ref={pdfRef}
      className={styles.report}
    >
      <div className="font-bold text-3xl w-full">Medical Report</div>
      <div className={styles.infoArea}>
        <div className={`${styles.info}`}>
          <div className="font-bold text-lg">Patient Information</div>
          <div className={styles.infoBox}>
            {['Patient ID', 'Sex', 'Age', 'Registration No'].map((label, index) => (
              <div
                key={index}
                className="w-full"
              >
                <div className={styles.oneInfo}>
                  <div
                    className={`font-bold w-1/3 ${label === 'Registration No' ? 'tracking-tighter' : ''} max-1024:text-sm max-1024:w-[42%]`}
                  >
                    {label}
                  </div>
                  <div className="flex gap-[2px]">
                    <div className="">:</div>
                    <div className="">123456789</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.info}`}>
          <div className="font-bold text-lg">Diagnosis</div>
          <div className={styles.infoBox}>
            {['Disease', 'Location', 'Size'].map((label, index) => (
              <div
                key={index}
                className="w-full"
              >
                <div className={styles.oneInfo}>
                  <div className={`font-bold w-1/3`}>{label}</div>
                  <div className="flex gap-[2px]">
                    <div className="">:</div>
                    <div className="">123456789</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.image}>
          <Image
            src={XrayImg}
            alt="이미지"
            width={250}
            height={250}
          />
        </div>
      </div>

      <div className={`${styles.analysisArea} flex flex-col gap-7`}>
        <div className={styles.field}>
          <div className="font-bold text-lg">Finding</div>
          <div className={styles.analysisBox}>{finding}</div>
        </div>

        <div className={styles.field}>
          <div className="font-bold text-lg">Impression</div>
          <div className={styles.analysisBox}>{immpression}</div>
        </div>

        <div className={styles.field}>
          <div className="font-bold text-lg">Plan</div>
          <div className={styles.analysisBox}>{plan}</div>
        </div>
      </div>
    </div>
  );
}

import { CgClose } from '@react-icons/all-files/cg/CgClose';
import { useRef, useState } from 'react';
import styles from './ExportModal.module.scss';
import Image from 'next/image';
import xrayDefault from '@/assets/images/xray-default.webp';
import { fetchPDF } from '@/apis/fetchPDF';
import RectangleOverlay from './RectangleOverlay';
import CanvasOverlay from './CanvasOverlay';
import { useAppSelector } from '@/redux/store/hooks/store';

const fieldOptions = ['Finding', 'Impression', 'Plan'];
type ExportModalProps = {
  onClose: () => void;
};

export default function ExportModal({ onClose }: ExportModalProps) {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgWrapperRef = useRef<HTMLDivElement | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const coordinatesFromRedux = useAppSelector((state) => state.coordinate.coordinates);
  const { reportData } = useAppSelector((state) => state.report);

  const pdfRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadPDF = async () => {
    fetchPDF();
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    if (imgWrapperRef.current) {
      setImageSize({
        width: imgWrapperRef.current.offsetWidth,
        height: imgWrapperRef.current.offsetHeight,
      });
    }
  };

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

  const handleAddField = (field: string) => {
    setSelectedFields([...selectedFields, field]);
    setDropdownOpen(false);
    console.log(selectedFields);
  };

  const handleRemoveField = (field: string) => {
    setSelectedFields(selectedFields.filter((f) => f !== field));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <CgClose
          className="absolute right-2 top-2 cursor-pointer text-rgb0.5"
          onClick={onClose}
        />
        {/* pdf 내보내기 리포트 영역 */}
        <div
          ref={pdfRef}
          className={styles.report}
        >
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
                        <div className={`font-bold w-1/3 max-1024:text-sm max-1024:w-1/2`}>
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

            <div
              className={styles.image}
              ref={imgWrapperRef}
            >
              <Image
                src={reportData?.imageUrl || xrayDefault} // 기본 이미지 URL 설정
                alt="이미지"
                width={250}
                height={250}
                onLoad={handleImageLoad} // 이미지 로드 완료 시 호출
                priority
              />
              {isImageLoaded && <RectangleOverlay imgWrapperRef={imgWrapperRef} />}
              {isImageLoaded && (
                <CanvasOverlay
                  coordinatesGroups={coordinatesFromRedux}
                  imageSize={imageSize}
                />
              )}
            </div>
          </div>

          <div className={styles.analysisArea}>
            {selectedFields.includes('Finding') && (
              <div className={styles.field}>
                <div className="font-bold text-lg">Finding</div>
                <div className={styles.analysisBox}>{finding}</div>
                <div className="w-full flex justify-end">
                  <button
                    className="text-sm underline pr-1"
                    onClick={() => handleRemoveField('Finding')}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
            {selectedFields.includes('Impression') && (
              <div className={styles.field}>
                <div className="font-bold text-lg">Impression</div>
                <div className={styles.analysisBox}>{immpression}</div>
                <div className="w-full flex justify-end">
                  <button
                    className="text-sm underline pr-1"
                    onClick={() => handleRemoveField('Impression')}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
            {selectedFields.includes('Plan') && (
              <div className={styles.field}>
                <div className="font-bold text-lg">Plan</div>
                <div className={styles.analysisBox}>{plan}</div>
                <div className="w-full flex justify-end">
                  <button
                    className="text-sm underline pr-1"
                    onClick={() => handleRemoveField('Plan')}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {/* 필드 추가 버튼 및 드롭다운 */}
            <div className={styles.addFieldArea}>
              {selectedFields.length < 3 && (
                <button
                  className={`px-2 rounded-full bg-blue-btn text-white font-bold text-xl border-2 border-transparent hover:border-blue-btn hover:text-blue-btn hover:bg-white ${dropdownOpen ? styles.dropdownActive : ''}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  +
                </button>
              )}

              {dropdownOpen && (
                <div className="w-fit bg-white shadow-md rounded-md p-2 text-blue-btn border-solid border border-black/20">
                  {fieldOptions
                    .filter((option) => !selectedFields.includes(option))
                    .map((option, index) => (
                      <div
                        key={index}
                        onClick={() => handleAddField(option)}
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center gap-2"
                      >
                        {option}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.btnArea}>
          <button className="outline outline-blue-btn text-blue-btn px-3 py-2 rounded-md hover:text-white hover:bg-blue-btn">
            Save
          </button>
          <button
            className="outline outline-[#ff484a] text-[#ff484a] px-3 py-2 rounded-md hover:text-white hover:bg-[#ff484a]"
            onClick={() => {
              handleDownloadPDF();
            }}
          >
            Export PDF
          </button>
          <button
            className="outline outline-gray-400 text-gray-400 px-3 py-2 rounded-md hover:text-white hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

import { CgClose } from '@react-icons/all-files/cg/CgClose';
import { useRef, useState } from 'react';
import styles from './ExportModal.module.scss';
import Image from 'next/image';
import xrayDefault from '@/assets/images/xray-default.webp';
import { fetchPDF } from '@/apis/fetchPDF';
import RectangleOverlay from './RectangleOverlay';
import CanvasOverlay from './CanvasOverlay';
import { useAppSelector } from '@/redux/store/hooks/store';
import { MessageType } from '../../ChatLayout';
import { find } from '@/apis/find';
import { fetchImpression } from '@/apis/impression';
import { HashLoader } from 'react-spinners';

const fieldOptions = ['Finding', 'Impression', 'Plan'];
type ExportModalProps = () => void;
export default function ExportModal({
  onClose,
  messagelist,
}: {
  onClose: ExportModalProps;
  messagelist: MessageType[];
}) {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgWrapperRef = useRef<HTMLDivElement | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const coordinatesFromRedux = useAppSelector((state) => state.coordinate.coordinates);
  const { reportData } = useAppSelector((state) => state.report);
  const [finding, setFinding] = useState<string>('');
  const [impression, setImpression] = useState<string>('');
  const [findingLoading, setFindingLoading] = useState<boolean>(false);

  const pdfRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadPDF = async () => {
    fetchPDF();
  };

  const handleFinding = async () => {
    if (reportData !== null) {
      setFindingLoading(true);
      try {
        const data = await find(messagelist, reportData);
        if (data) {
          setFinding(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setFindingLoading(false);
      }
    }
  };

  const handleImpression = async () => {
    if (reportData !== null) {
      const data = await fetchImpression(finding, reportData);
      if (data) {
        setImpression(data);
      }
    }
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
                <div
                  className={`${styles.analysisBox} ${findingLoading && 'flex justify-center items-center h-[70px] p-5'}`}
                >
                  {findingLoading ? <HashLoader /> : finding}
                </div>
              </div>
            )}
            {selectedFields.includes('Impression') && (
              <div className={styles.field}>
                <div className="font-bold text-lg">Impression</div>
                <div className={styles.analysisBox}>{impression}</div>
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
                        onClick={() => {
                          handleAddField(option);
                          if (option === 'Finding') {
                            handleFinding();
                          }
                          if (option === 'Impression') {
                            handleImpression();
                          }
                        }}
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

import styles from './PatientDB.module.scss';
import { FaDatabase } from 'react-icons/fa6';
import { FaSortDown } from 'react-icons/fa';
// import { FaSortUp } from "react-icons/fa";

export default function PatientDB() {
  return (
    <div className={`${styles.main} fixed w-full h-full flex justify-center items-center`}>
      <div
        className={`${styles.box} w-[50%] min-w-[490px] h-[60%] min-h-[350px] rounded-[20px] flex flex-col p-6`}
      >
        <div className={`${styles.title} flex items-center gap-4`}>
          <FaDatabase className={styles.dbIcon} />
          <span>Patient Database</span>
        </div>
        <div className={`${styles.table} justify-centerw-full h-full pl-4 pr-4`}>
          <table className={`w-full`}>
            <thead>
              <th className="flex justify-center items-center w-[100%] h-full gap-1">
                <span>PID</span>
                <FaSortDown className={`${styles.down} flex justify-center items-center`} />
              </th>
              <th className="w-[12.5%]">SEX</th>
              <th className="w-[12.5%]">AGE</th>
              <th className="w-[30%]">Modality</th>
              <th className="flex justify-center items-center w-[100%] h-full gap-1">
                <span>Visit Date</span>
                <FaSortDown className={`${styles.down} flex justify-center items-center`} />
              </th>
            </thead>
            <tbody>
              <tr>
                <td>1373</td>
                <td>M</td>
                <td>58</td>
                <td>CXR</td>
                <td>2024.08.15</td>
              </tr>
              <tr>
                <td>1373</td>
                <td>M</td>
                <td>58</td>
                <td>CXR, CE</td>
                <td>2024.06.12</td>
              </tr>
              <tr>
                <td>1075</td>
                <td>F</td>
                <td>59</td>
                <td>CXR</td>
                <td>2024.05.06</td>
              </tr>
              <tr>
                <td>1373</td>
                <td>M</td>
                <td>58</td>
                <td>CXR</td>
                <td>2024.08.15</td>
              </tr>
              <tr>
                <td>1373</td>
                <td>M</td>
                <td>58</td>
                <td>CXR, CE</td>
                <td>2024.06.12</td>
              </tr>
              <tr>
                <td>1075</td>
                <td>F</td>
                <td>59</td>
                <td>CXR</td>
                <td>2024.05.06</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

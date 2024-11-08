import RegistInput from './components/RegistInput/RegistInput';
import RegistTitle from './components/RegistTitle/RegistTitle';
import styles from './page.module.scss';

export default function RegistPage() {
  return (
    <div
      className={`${styles.main} w-screen h-screen overflow-x-hidden flex flex-col items-center pt-[75px] gap-5`}
    >
      <RegistTitle />
      <RegistInput />
    </div>
  );
}

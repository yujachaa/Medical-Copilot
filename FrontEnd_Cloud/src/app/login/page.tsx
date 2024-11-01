import LoginInput from './components/LoginInput/LoginInput';
import LoginTitle from './components/LoginTitle/LoginTitle';
import styles from './page.module.scss';

export default function Login() {
  return (
    <div
      className={`${styles.main} w-screen h-screen overflow-x-hidden flex flex-col items-center pt-[150] gap-10`}
    >
      <LoginTitle />
      <LoginInput />
    </div>
  );
}

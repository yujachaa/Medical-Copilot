import dynamic from 'next/dynamic';

const LoginInput = dynamic(() => import('./components/LoginInput/LoginInput'));
const LoginTitle = dynamic(() => import('./components/LoginTitle/LoginTitle'));
import styles from './page.module.scss';

export default function Login() {
  return (
    <div
      className={`${styles.main} w-screen h-screen overflow-x-hidden flex flex-col items-center pt-[150px] gap-10`}
    >
      <LoginTitle />
      <LoginInput />
    </div>
  );
}

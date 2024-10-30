import styles from './LoginInput.module.scss';

export default function LoginInput() {
  return (
    <div className={`${styles.main} flex flex-col items-center gap-10`}>
      <div className={`flex flex-col gap-[7]`}>
        <input
          className={`${styles.Email} w-[422] h-[70]`}
          placeholder="Email"
        />
        <input
          className={`${styles.PW} w-[422] h-[70]`}
          placeholder="Password"
        />
      </div>
      <div className={`${styles.btn} flex justify-between w-full`}>
        <button className={`${styles.signup} w-[190] h-[64] flex justify-center items-center`}>
          Sign up
        </button>
        <button className={`${styles.login} w-[190] h-[64] flex justify-center items-center`}>
          Login
        </button>
      </div>
      <span className={`text-xl underline cursor-pointer`}>Having Trouble?</span>
    </div>
  );
}

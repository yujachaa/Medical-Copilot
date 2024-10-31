import styles from './RegistInput.module.scss';

export default function RegistInput() {
  return (
    <>
      <div className={`${styles.main} flex flex-col items-center gap-1`}>
        <div className={`flex flex-col h-[78]`}>
          <input
            className={`w-[400] h-[60] rounded-[10] ${styles.input}`}
            placeholder="Email"
          />
          <span className={`flex justify-end ${styles.text}`}>Please check the email format.</span>
        </div>
        <div className={`flex flex-col h-[78]`}>
          <input
            className={`w-[400] h-[60] rounded-[10] ${styles.input}`}
            placeholder="Name"
          />
          <span className={`flex justify-end ${styles.text}`}>
            Please write in English 1~20 characters
          </span>
        </div>
        <div className={`flex flex-col h-[78]`}>
          <input
            className={`w-[400] h-[60] rounded-[10] ${styles.input}`}
            placeholder="Password"
            type="password"
          />
          <span className={`flex justify-end ${styles.text}`}>Check the password format.</span>
        </div>
        <div className={`flex flex-col h-[78]`}>
          <input
            className={`w-[400] h-[60] rounded-[10] ${styles.input}`}
            placeholder="Confirm Password"
            type="password"
          />
          <span className={`flex justify-end ${styles.text}`}>The password is different.</span>
        </div>
      </div>
      <span className={`w-[400] h-[40] text-xs`}>
        Please use 8 to 15 characters of English case letters, numbers, and special characters for
        the password.
      </span>
      <div className={`flex justify-between w-[400]`}>
        <button
          className={`w-[170] h-[64] flex justify-center items-center rounded-[5] ${styles.cancel}`}
        >
          Cancel
        </button>
        <button
          className={`w-[170] h-[64] flex justify-center items-center rounded-[5] ${styles.confirm}`}
        >
          Confirm
        </button>
      </div>
    </>
  );
}

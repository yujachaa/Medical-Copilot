import ClientListBox from './components/ClientListBox/ClientListBox';
import GraphBox from './components/GraphBox/GraphBox';
import styles from './page.module.scss';

export default function MainPage() {
  return (
    <div className={`${styles.main} w-screen h-fit flex p-6 gap-6 overflow-x-hidden`}>
      <GraphBox />
      <ClientListBox />
    </div>
  );
}

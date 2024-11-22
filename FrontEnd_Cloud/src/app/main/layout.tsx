import Header from '@/components/Header/Header';
import ClientAdd from './components/ClientAdd/ClientAdd';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`w-screen h-screen overflow-x-hidden`}>
      <Header />
      {children}
      <ClientAdd />
    </div>
  );
}

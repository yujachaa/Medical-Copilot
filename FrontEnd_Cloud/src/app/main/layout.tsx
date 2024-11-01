import Header from '@/components/Header/Header';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`w-screen h-screen overflow-x-hidden`}>
      <Header />
      {children}
    </div>
  );
}

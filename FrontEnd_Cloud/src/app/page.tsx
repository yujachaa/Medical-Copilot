import Link from 'next/link';

export default function Home() {
  console.log('123');
  return (
    <div className=" ">
      <Link href="/">관리자페이지입니다.</Link>
    </div>
  );
}

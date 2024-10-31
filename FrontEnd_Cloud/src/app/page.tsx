import Link from 'next/link';

export default function Home() {
  console.log('123');
  return (
    <div className=" ">
      <Link href="/login">로그인 페이지로 이동</Link>
    </div>
  );
}

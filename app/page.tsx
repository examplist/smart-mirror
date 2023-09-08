import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div>안녕하세요? 스마트미러입니다.</div>
      <div>
        <Link href={'/customer'}>고객 페이지로</Link>
        <Link href={'/admin'}>관리자 페이지로</Link>
      </div>
    </main>
  );
}

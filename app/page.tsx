import Link from 'next/link';
import style from '@/styles/home/page.module.scss';
import Header from '@/app/common/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className={style['main']}>
        <h1 className={style['greet']}>'I' MIRROR</h1>
        <div className={style['links']}>
          <Link href={'/customer'}>고객 페이지로</Link>
          <Link href={'/admin'}>관리자 페이지로</Link>
        </div>
      </main>
    </>
  );
}

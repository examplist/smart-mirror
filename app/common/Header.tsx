import Link from 'next/link';
import style from '@/styles/common/Header.module.scss';

export default function Header() {
  return (
    <header className={style['header']}>
      <div className={style['logo']} id="header-logo">
        <Link href={'/'}>'I' MIRROR</Link>
      </div>
      <div className={style['empty']}></div>
    </header>
  );
}

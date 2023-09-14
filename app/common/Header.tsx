import Link from 'next/link';
import style from '@/styles/common/Header.module.scss';

export default function Header() {
  return (
    <header className={style['header']}>
      <div className={style['logo']} id="header-logo">
        <Link href={'/'}>스마트미러</Link>
      </div>
      <div className={style['empty']}></div>
    </header>
  );
}

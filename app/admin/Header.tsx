'use client';

import Link from 'next/link';
import { useAuthStore, FAILED, FETCHED } from '@/store/auth';
import style from '@/styles/common/Header.module.scss';

export default function Header() {
  const { admin_status } = useAuthStore();

  return (
    <header className={style['header']}>
      <div className={style['logo']} id="header-logo">
        <Link href={'/'}>스마트미러</Link>
      </div>
      <div className={style['empty']}></div>
      {admin_status === FAILED ? <div>로그인</div> : <div>로그아웃</div>}
    </header>
  );
}

'use client';

import Link from 'next/link';
import { useAuthStore, FAILED, FETCHED } from '@/store/auth';
import style from '@/styles/common/Header.module.scss';

export default function Header() {
  const { customer_status } = useAuthStore();

  return (
    <header className={style['header']}>
      <div className={style['logo']} id="header-logo">
        <Link href={'/'}>스마트미러</Link>
      </div>
      <div className={style['empty']}></div>
      {customer_status === FAILED ? <div>로그인</div> : <div>로그아웃</div>}
    </header>
  );
}

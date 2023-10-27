'use client';

import Link from 'next/link';
import { useAuthStore, FAILED, FETCHED } from '@/store/auth';
import { logout } from '@/utils/auth/admin';
import style from '@/styles/common/Header.module.scss';

export default function Header() {
  const { admin_status } = useAuthStore();
  const click$logout = () => {
    logout();
    location.href = '/admin';
  };

  return (
    <header className={`${style['header']} ${style['admin']}`}>
      <div className={style['logo']} id="header-logo">
        <Link href={'/'}>'I' MIRROR</Link>
      </div>
      <div className={style['empty']}></div>
      {admin_status === FAILED ? (
        <div className={style['login']}>
          <Link href={'/admin/login'}>로그인</Link>
        </div>
      ) : (
        <button className={style['logout']} onClick={click$logout}>
          로그아웃
        </button>
      )}
    </header>
  );
}

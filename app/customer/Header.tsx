'use client';

import Link from 'next/link';
import { useAuthStore, FAILED, FETCHED } from '@/store/auth';
import { logout } from '@/utils/auth/customer';
import style from '@/styles/common/Header.module.scss';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { customer_status } = useAuthStore();
  const router = useRouter();
  const click$logout = () => {
    logout();
    location.href = '/customer';
  };

  return (
    <header className={style['header']}>
      <div className={style['logo']} id="header-logo">
        <Link href={'/'}>'I' MIRROR</Link>
      </div>
      <div className={style['empty']}></div>
      {customer_status === FAILED ? (
        <div className={style['login']}>
          <Link href={'/customer/login'}>로그인</Link>
        </div>
      ) : (
        <button className={style['logout']} onClick={click$logout}>
          로그아웃
        </button>
      )}
    </header>
  );
}

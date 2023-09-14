'use client';

import { useAuthStore, FAILED, FETCHED } from '@/store/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout } from '@/utils/auth/customer';
import style from '@/styles/customer/page.module.scss';

export default function customerHome() {
  const { customer_status } = useAuthStore();
  const router = useRouter();

  const click$buttonInfo = () => {
    router.push('/customer/list');
  };

  const click$logout = () => {
    logout();
    location.href = '/customer';
  };

  if (customer_status === FAILED) {
    return (
      <main className={style['main']}>
        <h1 className={style['greet']}>
          안녕하세요? 스마트미러 고객 페이지입니다.
        </h1>
        <div className={style['links']}>
          <Link href={'/customer/login'}>로그인하기</Link>
        </div>
      </main>
    );
  }

  if (customer_status === FETCHED) {
    return (
      <main className={style['main']}>
        <h1 className={style['greet']}>
          안녕하세요? 스마트미러 고객 페이지입니다.
        </h1>
        <div className={style['buttons']}>
          <button className={style['button-info']} onClick={click$buttonInfo}>
            내 정보 보기
          </button>
          <button className={style['button-logout']} onClick={click$logout}>
            로그아웃하기
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={style['main']}>
      <section className={style['loading']}>로딩 중</section>
    </main>
  );
}

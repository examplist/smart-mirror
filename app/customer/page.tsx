'use client';

import { useAuthStore, FAILED, FETCHED } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { logout } from '@/utils/auth/customer';
import style from '@/styles/common/Start.module.scss';

const greet = '안녕하세요? 스마트미러입니다.';

export default function customerHome() {
  const { customer_status } = useAuthStore();
  const router = useRouter();

  const click$toLogin = () => {
    router.push('/customer/login');
  };

  const click$buttonInfoTable = () => {
    router.push('/customer/list');
  };

  const click$buttonInfoGraph = () => {
    router.push('/customer/chart');
  };

  const click$logout = () => {
    logout();
    location.href = '/customer';
  };

  if (customer_status === FAILED) {
    return (
      <main className={style['main']}>
        <h1 className={style['greet']}>{greet}</h1>
        <div className={style['buttons']}>
          <button onClick={click$toLogin}>로그인하기</button>
        </div>
      </main>
    );
  }

  if (customer_status === FETCHED) {
    return (
      <main className={style['main']}>
        <h1 className={style['greet']}>{greet}</h1>
        <div className={style['buttons']}>
          <button
            className={style['button-info-table']}
            onClick={click$buttonInfoTable}
          >
            내 정보 (표)
          </button>
          <button
            className={style['button-info-graph']}
            onClick={click$buttonInfoGraph}
          >
            내 정보 (그래프)
          </button>
          <button className={style['button-logout']} onClick={click$logout}>
            로그아웃
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

'use client';

import { useAuthStore, FAILED, FETCHED } from '@/store/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout } from '@/utils/auth/admin';
import style from '@/styles/admin/page.module.scss';

export default function adminHome() {
  const { admin_status } = useAuthStore();
  const router = useRouter();

  const click$buttonInfoTable = () => {
    router.push('/admin/list');
  };

  const click$buttonInfoGraph = () => {
    router.push('/admin/chart');
  };

  const click$logout = () => {
    logout();
    location.href = '/admin';
  };

  if (admin_status === FAILED) {
    return (
      <main className={style['main']}>
        <h1 className={style['greet']}>
          안녕하세요? 스마트미러 관리자 페이지입니다.
        </h1>
        <div className={style['links']}>
          <Link href={'/admin/login'}>로그인하기</Link>
        </div>
      </main>
    );
  }

  if (admin_status === FETCHED) {
    return (
      <main className={style['main']}>
        <h1 className={style['greet']}>
          안녕하세요? 스마트미러 관리자 페이지입니다.
        </h1>
        <div className={style['buttons']}>
          <button
            className={style['button-info-table']}
            onClick={click$buttonInfoTable}
          >
            고객 정보 (표)
          </button>
          <button
            className={style['button-info-graph']}
            onClick={click$buttonInfoGraph}
          >
            고객 정보 (그래프)
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
      <section className={style['only-message']}>로딩 중</section>
    </main>
  );
}

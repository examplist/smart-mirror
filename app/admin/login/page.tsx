'use client';

import { useAuthStore, FAILED, FETCHED } from '@/store/auth';
import Form from './Form';
import style from '@/styles/common/login/page.module.scss';

export default function customerLogin() {
  const { admin_status, admin_id } = useAuthStore();

  // ! 이 순서를 꼭 맞춰야 한다. FAILED > null > FETCHED

  if (admin_status === FAILED) {
    return (
      <main className={style['main']}>
        <Form />
      </main>
    );
  }

  if (admin_id === null) {
    return (
      <main className={style['main']}>
        <section className={style['loading']}>로딩 중</section>
      </main>
    );
  }

  if (admin_status === FETCHED) {
    return (
      <main className={style['main']}>
        <section className={style['logout']}>이미 로그인을 하셨습니다.</section>
      </main>
    );
  }
}

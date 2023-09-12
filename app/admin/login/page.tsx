'use client';

import { useAuthStore } from '@/store/auth';
import Form from './Form';
import style from '@/styles/customer/login/page.module.scss';
import { FAILED, FETCHED } from '@/store/auth';

export default function customerLogin() {
  const { admin_status } = useAuthStore();

  if (admin_status === FETCHED) {
    return (
      <main className={style['main']}>
        <section className={style['logged-in']}>
          이미 로그인을 하셨습니다.
        </section>
      </main>
    );
  }

  if (admin_status === FAILED) {
    return (
      <main className={style['main']}>
        <Form />
      </main>
    );
  }

  return <main className={style['main']}>로딩 중</main>;
}

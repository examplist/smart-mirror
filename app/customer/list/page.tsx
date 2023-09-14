'use client';

import { useAuthStore, FAILED, FETCHED } from '@/store/auth';
import List from './List';
import style from '@/styles/customer/list/page.module.scss';

export default function customerList() {
  const { customer_status, customer_id } = useAuthStore();

  // ! 이 순서를 꼭 맞춰야 한다. FAILED > null > FETCHED

  if (customer_status === FAILED) {
    return (
      <main className={style['main']}>
        <section className={style['only-message']}>
          로그인을 하셔야 합니다.
        </section>
      </main>
    );
  }

  if (customer_id === null) {
    return (
      <main className={style['main']}>
        <section className={style['only-message']}>로딩 중</section>
      </main>
    );
  }

  if (customer_status === FETCHED) {
    return (
      <main className={style['main']}>
        <List customer={customer_id} />
      </main>
    );
  }
}

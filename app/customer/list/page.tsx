'use client';

import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import { FAILED, FETCHED } from '@/store/auth';
import List from './List';
import style from '@/styles/customer/list/page.module.scss';

export default function customerList() {
  const { customer_status, customer_id } = useAuthStore();

  useEffect(() => {}, []);

  if (customer_status === FAILED || customer_id === null) {
    return <main>로그인을 하셔야 합니다.</main>;
  }

  if (customer_status === FETCHED) {
    return (
      <main className={style['main']}>
        <List customer={customer_id} />
      </main>
    );
  }

  return <main>로딩 중</main>;
}

'use client';

import { useAuthStore } from '@/store/auth';
import { useEffect, useState, useRef, FormEvent } from 'react';
import { FAILED, FETCHED } from '@/store/auth';
import List from './List';
import style from '@/styles/admin/list/page.module.scss';

export default function adminList() {
  const { customer_status, customer_id } = useAuthStore();

  if (customer_status === FAILED || customer_id === null) {
    return <main>로그인을 하셔야 합니다.</main>;
  }

  if (customer_status === FETCHED) {
    return <List />;
  }

  return <main>로딩 중</main>;
}

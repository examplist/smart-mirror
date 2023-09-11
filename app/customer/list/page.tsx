'use client';

import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';

export default function customerList() {
  const { customer_status, customer_name, customer_birth } = useAuthStore();

  useEffect(() => {}, []);

  if (customer_status === 'failed') {
    return <>로그인을 하셔야 합니다.</>;
  }

  if (customer_status === 'fetched') {
    return <>로그인 한 상태</>;
  }

  return <div>page</div>;
}

'use client';

import { useAuthStore } from '@/store/auth';
import { sendStorageAuth as customerSendStorageAuth } from '@/utils/auth/customer';
import { useEffect } from 'react';

export default function Auth() {
  const { setCustomer } = useAuthStore();

  useEffect(() => {
    const { status: customerSatus, id: customerId } = customerSendStorageAuth();
    setCustomer(customerSatus, customerId);
  }, []);

  return <></>;
}

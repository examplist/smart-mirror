'use client';

import { useAuthStore } from '@/store/auth';
import { sendStorageAuth as customerSendStorageAuth } from '@/utils/auth/customer';
import { sendStorageAuth as adminSendStorageAuth } from '@/utils/auth/admin';
import { useEffect } from 'react';

export default function Auth() {
  const { setCustomer, setAdmin } = useAuthStore();

  useEffect(() => {
    const { status: customerSatus, id: customerId } = customerSendStorageAuth();
    setCustomer(customerSatus, customerId);

    const { status: adminStatus, id: adminId } = adminSendStorageAuth();
    setAdmin(adminStatus, adminId);
  }, []);

  return <></>;
}

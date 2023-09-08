'use client';

import { useEffect, useState } from 'react';

export default function customerHome() {
  const [loggined, setLoggined] = useState<string>('로그인 중');

  useEffect(() => {
    const customer_name = localStorage.getItem('customer_name');
    const customer_birth = localStorage.getItem('customer_birth');

    fetch('/api/');
  }, []);

  if (loggined === '로그인 중') {
    return (
      <main>
        <div>로그인 중입니다.</div>
      </main>
    );
  }

  if (loggined === '되었음') {
    return (
      <main>
        <div></div>
      </main>
    );
  }
}

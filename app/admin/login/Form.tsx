'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, FETCHED } from '@/store/auth';
import { login } from '@/utils/auth/admin';
import style from '@/styles/customer/login/Form.module.scss';

export default function customerForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const refId = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const { setAdmin } = useAuthStore();

  const click$login = async () => {
    const inputId = refId.current?.value;
    const inputPassword = refPassword.current?.value;
    if (!inputId || !inputPassword) {
      alert('아이디와 비밀번호를 입력하세요!');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: inputId,
          password: inputPassword,
        }),
      });
      const { succeeded, id } = await response.json();

      if (!succeeded) {
        alert('죄송합니다. 문제가 발생했습니다.');
        setLoading(false);
      } else {
        login(id);
        setAdmin(FETCHED, id);
        router.push('/admin');
      }
    } catch (error) {
      console.error(error);
      alert('죄송합니다. 문제가 발생했습니다.');
      setLoading(false);
    }
  };

  return (
    <section className={style['not-logged-in']} id="sign-form">
      <label htmlFor="aid" className={style['label']}>
        아이디
      </label>
      <input type={'text'} id="aid" className={style['input']} ref={refId} />
      <label htmlFor="password" className={style['label']}>
        비밀번호
      </label>
      <input
        type={'password'}
        id="password"
        className={style['input']}
        ref={refPassword}
      />
      <div className={style['buttons']}>
        <button
          onClick={click$login}
          disabled={loading}
          className={style['log-in']}
          id="log-in"
        >
          로그인
        </button>
      </div>
    </section>
  );
}

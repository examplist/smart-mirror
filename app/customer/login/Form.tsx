'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, FETCHED } from '@/store/auth';
import { login } from '@/utils/auth/customer';
import style from '@/styles/common/login/Form.module.scss';

export default function customerForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const refName = useRef<HTMLInputElement>(null);
  const refBirth = useRef<HTMLInputElement>(null);
  const { setCustomer } = useAuthStore();

  const click$login = async () => {
    const inputName = refName.current?.value;
    const inputBirth = refBirth.current?.value;
    if (!inputName || !inputBirth) {
      alert('이름과 생년월일을 입력하셔야 합니다.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/customer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: inputName,
          birth: inputBirth,
        }),
      });
      const { noExist, internalError, id } = await response.json();
      if (noExist) {
        alert('죄송합니다. 해당 계정이 존재하지 않습니다.');
        setLoading(false);
      } else if (internalError) {
        alert('죄송합니다. 문제가 발생했습니다.');
        setLoading(false);
      } else {
        login(id);
        setCustomer(FETCHED, id);
        router.push('/customer');
      }
    } catch (error) {
      console.error(error);
      alert('죄송합니다. 문제가 발생했습니다.');
      setLoading(false);
    }
  };

  return (
    <section className={style['section']} id="sign-form">
      <label htmlFor="name" className={style['label']}>
        이름
      </label>
      <input type={'text'} id="name" className={style['input']} ref={refName} />
      <label htmlFor="birth" className={style['label']}>
        생년월일
      </label>
      <input
        type={'text'}
        placeholder={'예) 2023-09-11'}
        id="birth"
        className={style['input']}
        ref={refBirth}
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

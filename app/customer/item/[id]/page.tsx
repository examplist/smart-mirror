'use client';

import { useEffect, useState } from 'react';
import Expression from './Expression';
import { useAuthStore, FAILED, FETCHED } from '@/store/auth';
import style from '@/styles/common/item/page.module.scss';

export default function customerItem({ params }: { params: { id: string } }) {
  const { customer_status, customer_id } = useAuthStore();

  const { id } = params;
  const [smile, setSmile] = useState<any>();
  const [laugh, setLaugh] = useState<any>();
  const [openEye, setOpenEye] = useState<any>();
  const [closeEye, setCloseEye] = useState<any>();

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/common/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      });
      if (response.status === 404) {
        alert('죄송합니다. 자료를 가져오는 데 문제가 발생했습니다.');
        return;
      }
      const { succeeded, result } = await response.json();
      if (!succeeded) {
        alert('죄송합니다. 자료를 가져오는 데 문제가 발생했습니다.');
        return;
      } else {
        setSmile(result.smile);
        setLaugh(result.laugh);
        setOpenEye(result.openEye);
        setCloseEye(result.closeEye);
      }
    })();
  }, [smile, laugh, openEye, closeEye]);

  if (customer_status === FAILED) {
    return (
      <main className={style['main']}>
        <section className={style['logout']}>로그인을 하셔야 합니다.</section>
      </main>
    );
  }

  if (customer_id === null) {
    return (
      <main className={style['main']}>
        <section className={style['loading']}>로딩 중</section>
      </main>
    );
  }

  if (customer_status === FETCHED) {
    if (smile) {
      return (
        <main>
          <Expression bundle={smile} type={'smile'} />
          <Expression bundle={laugh} type={'laugh'} />
          <Expression bundle={closeEye} type={'closeEye'} />
          <Expression bundle={openEye} type={'openEye'} />
        </main>
      );
    } else {
      return (
        <main className={style['main']}>
          <section className={style['nothing']}>
            해당되는 자료가 없습니다.
          </section>
        </main>
      );
    }
  }
}

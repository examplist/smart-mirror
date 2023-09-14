'use client';

import Link from 'next/link';
import style from '@/styles/admin/list/Item.module.scss';

export default function Item({
  customer_name,
  customer_birth,
  time,
  uuid,
}: {
  customer_name: string;
  customer_birth: string;
  time: string;
  uuid: string;
}) {
  console.log({ customer_name, customer_birth });

  return (
    <section className={style['section']}>
      <div className={style['customer_name']}>{customer_name}</div>
      <div className={style['customer_birth']}>{customer_birth}</div>
      <div className={style['time']}>{time}</div>
      <div className={style['link']}>
        <Link href={`/admin/item/${uuid}`}>해당 페이지로 이동</Link>
      </div>
    </section>
  );
}

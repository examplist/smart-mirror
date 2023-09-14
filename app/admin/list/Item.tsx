'use client';

import Link from 'next/link';
import style from '@/styles/customer/list/Item.module.scss';

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
      <div>{customer_name}</div>
      <div>{customer_birth}</div>
      <div className={style['time']}>{time}</div>
      <div className={style['link']}>
        <Link href={`/admin/item/${uuid}`}>해당 페이지로 이동</Link>
      </div>
    </section>
  );
}

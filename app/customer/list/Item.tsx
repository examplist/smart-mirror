import Link from 'next/link';
import style from '@/styles/customer/list/Item.module.scss';

export default function Item({ time, uuid }: { time: string; uuid: string }) {
  return (
    <section className={style['section']}>
      <div className={style['time']}>{time}</div>
      <div className={style['link']}>
        <Link href={`/customer/item/${uuid}`}>이동</Link>
      </div>
    </section>
  );
}

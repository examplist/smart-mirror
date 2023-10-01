'use client';

interface TypeItem {
  time: string;
  uuid: string;
}

import { useEffect, useState } from 'react';
import Item from './Item';
import style from '@/styles/customer/list/List.module.scss';

export default function List({ customer }: { customer: string }) {
  const [items, setItems] = useState<TypeItem[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/customer/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer,
        }),
      });
      const { succeeded, results } = await response.json();
      if (!succeeded) {
        alert('죄송합니다. 문제가 발생했습니다.');
      } else {
        setItems(results);
      }
    })();
  }, []);

  return (
    <div className={style['lists']}>
      <div className={style['inner-container']}>
        <div className={style['items_list_name']}>
          <div className={style['time']}>시간</div>
          <div className={style['link']}>링크</div>
        </div>
        <div className={style['items_list']}>
          {items.map((item) => {
            const { time, uuid } = item;
            return <Item time={time} uuid={uuid} key={uuid} />;
          })}
        </div>
      </div>
    </div>
  );
}

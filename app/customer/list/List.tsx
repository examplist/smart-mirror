'use client';

interface TypeItem {
  time: string;
  uuid: string;
}

import { useEffect, useState } from 'react';
import Item from './Item';

export default function List({ customer }: { customer: string }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchSucceeded, setFetchSucceeded] = useState<boolean>(true);
  const [items, setItems] = useState<TypeItem[]>([]);

  useEffect(() => {
    (async () => {
      //////////////////////////////
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
        setFetchSucceeded(false);
        setLoading(false);
      } else {
        console.log(results);
        setItems(results);
        setLoading(false);
      }

      //////////////////////////////
    })();
  }, []);

  if (loading) {
    return <div>로딩 중</div>;
  }

  if (!fetchSucceeded) {
    return <div>죄송합니다. 자료를 가져오는 데 문제가 발생했습니다.</div>;
  }

  return (
    <div>
      {items.map((item) => {
        const { time, uuid } = item;
        return <Item time={time} uuid={uuid} key={uuid} />;
      })}
    </div>
  );
}

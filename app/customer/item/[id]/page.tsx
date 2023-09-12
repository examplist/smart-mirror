'use client';

import { useEffect, useState } from 'react';
import Expression from './Expression';

export default function customerItem({ params }: { params: { id: string } }) {
  const { id } = params;
  const [smile, setSmile] = useState<any>();
  const [laugh, setLaugh] = useState<any>();
  const [openEye, setOpenEye] = useState<any>();
  const [closeEye, setCloseEye] = useState<any>();

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/customer/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      });
      const { succeeded, result } = await response.json();

      if (!succeeded) {
        // setFetchSucceeded(false);
        // setLoading(false);
      } else {
        console.log(result);
        setSmile(result.smile);
        setLaugh(result.laugh);
        setOpenEye(result.openEye);
        setCloseEye(result.closeEye);
        // setBundle(result);
        // setItems(results);
        // setLoading(false);
      }
    })();
  }, [smile, laugh, openEye, closeEye]);

  return (
    <div>
      <Expression bundle={smile} type={'smile'} />
      <Expression bundle={laugh} type={'laugh'} />
      <Expression bundle={openEye} type={'openEye'} />
      <Expression bundle={closeEye} type={'closeEye'} />
    </div>
  );
}

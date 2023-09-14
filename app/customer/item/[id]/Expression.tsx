'use client';

import { expressionToKor } from '@/utils/lang';
import Part from './Part';
import style from '@/styles/customer/item/Expression.module.scss';

export default function Expression({
  bundle,
  type,
}: {
  bundle: any;
  type: string;
}) {
  if (!bundle) {
    return '';
  }

  const contents = JSON.parse(bundle);

  return (
    <div className={style['container']}>
      <h1 className={style['title']}>{expressionToKor(type)}</h1>
      <Part type={'뺨'} contents={contents[0]} />
      <Part type={'눈'} contents={contents[1]} />
      <Part type={'눈썹'} contents={contents[2]} />
      <Part type={'입'} contents={contents[3]} />
    </div>
  );
}

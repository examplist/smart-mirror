'use client';

import style from '@/styles/customer/item/Part.module.scss';

export default function Part({
  type,
  contents,
}: {
  type: string;
  contents: any;
}) {
  return (
    <div>
      <div className={style['title']}>{type}</div>
      <table className={style['table']}>
        <thead>
          <tr>
            <th>좌_누적이동량</th>
            <th>우_누적이동량</th>
            <th>좌_최대실측치</th>
            <th>우_최대실측치</th>
            <th>좌우대칭성점수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{contents[0]}</td>
            <td>{contents[1]}</td>
            <td>{contents[2]}</td>
            <td>{contents[3]}</td>
            <td>{contents[4]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

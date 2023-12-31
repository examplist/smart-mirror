'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { moveToKor } from '@/utils/lang';
import { Move } from './List';
import style from '@/styles/customer/chart/Chart.module.scss';

export default function Chart({
  moveType,
  moveData,
}: {
  moveType: string;
  moveData: Move[];
}) {
  return (
    <>
      <h1 className={style['title']}>{moveToKor(moveType)}</h1>
      <section className={style['section']}>
        <ResponsiveContainer>
          <LineChart
            data={moveData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </>
  );
}

'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { moveToKor } from '@/utils/lang';
import { Move } from './List';

export default function Chart({
  moveType,
  moveData,
}: {
  moveType: string;
  moveData: Move[];
}) {
  return (
    <section>
      <h1>{moveToKor(moveType)}</h1>
      {/* <ResponsiveContainer> */}
      <LineChart
        width={600}
        height={100}
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
        {/* <Legend /> */}
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
      {/* </ResponsiveContainer> */}
    </section>
  );
}

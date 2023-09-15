import { NextResponse } from 'next/server';
import { timeToString } from '@/utils/time';
import * as ManipulateResults from '@/data/results';
import afterResults from './afterResults';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  const { customer_name, customer_birth, smile, laugh, closeEye, openEye } =
    await req.json();

  const time = timeToString(new Date());
  const customer = customer_name + '_' + customer_birth;
  const uuid = uuidv4();

  const obj: Record<string, ManipulateResults.Expression> = {
    smile,
    laugh,
    closeEye,
    openEye,
  };

  const { result: results_result, id: results_id } =
    await ManipulateResults.add(uuid, customer, obj, time);

  if (results_result === '실패' || results_id === null) {
    return NextResponse.json({ message: '죄송합니다. 문제가 발생했습니다.' });
  } else {
    afterResults(customer, obj, time, results_id);
    return NextResponse.json({});
  }
}

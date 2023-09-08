import { NextResponse } from 'next/server';
import { toMySQLDatetime } from '@/utils/time';
import * as ManipulateResults from '@/data/results';
import afterResults from './afterResults';

export async function POST(req: Request) {
  const { user_name, user_birth, smile, laugh, closeEye, openEye } =
    await req.json();

  const time = toMySQLDatetime(new Date());

  const { result: results_result, id: results_id } =
    await ManipulateResults.create(
      user_name,
      user_birth,
      smile,
      laugh,
      closeEye,
      openEye,
      time
    );

  if (results_result === '실패' || results_id === null) {
    return NextResponse.json({ message: '죄송합니다. 문제가 발생했습니다.' });
  } else {
    afterResults(
      user_name,
      user_birth,
      smile,
      laugh,
      closeEye,
      openEye,
      time,
      results_id
    );
    return NextResponse.json({});
  }
}

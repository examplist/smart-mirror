import { NextResponse } from 'next/server';
import * as ManipulateResults from '@/data/results';

export async function POST(req: Request) {
  const {
    customerName,
    customerBirth,
    dateFront,
    dateBack,
    expression,
    part,
    move,
    valueMin,
    valueMax,
  } = await req.json();

  console.log({
    customerName,
    customerBirth,
    dateFront,
    dateBack,
    expression,
    part,
    move,
    valueMin,
    valueMax,
  });

  if (expression === '' || part === '' || move === '') {
    const { succeeded, results } = await ManipulateResults.adminList(
      customerName,
      customerBirth,
      dateFront,
      dateBack
    );
    return NextResponse.json({ succeeded, results });
  }
}

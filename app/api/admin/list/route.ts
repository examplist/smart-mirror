import { NextResponse } from 'next/server';
import * as ManipulateResults from '@/data/results';
import * as ManipulateParts from '@/data/parts';

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
    page,
  } = await req.json();

  if (expression === '' || part === '' || move === '') {
    const { succeeded, results, count } = await ManipulateResults.adminList(
      customerName,
      customerBirth,
      dateFront,
      dateBack,
      page
    );
    return NextResponse.json({ succeeded, results, count });
  } else {
    const { succeeded, results, count } = await ManipulateParts.adminList(
      customerName,
      customerBirth,
      dateFront,
      dateBack,
      expression,
      part,
      move,
      valueMin,
      valueMax,
      page
    );
    return NextResponse.json({ succeeded, results, count });
  }
}

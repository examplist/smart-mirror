import { NextResponse } from 'next/server';
import * as ManipulateResults from '@/data/results';

export async function POST(req: Request) {
  const { customerName, customerBirth, expression } = await req.json();
  const { succeeded, results } = await ManipulateResults.adminChart(
    customerName,
    customerBirth,
    expression
  );
  return NextResponse.json({ succeeded, results });
}

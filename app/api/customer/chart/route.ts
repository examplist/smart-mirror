import { NextResponse } from 'next/server';
import * as ManipulateResults from '@/data/results';

export async function POST(req: Request) {
  const { customer, expression } = await req.json();

  const { succeeded, results } = await ManipulateResults.customerChart(
    customer,
    expression
  );
  return NextResponse.json({ succeeded, results });
}

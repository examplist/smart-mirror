import { NextResponse } from 'next/server';
import * as ManipulateResults from '@/data/results';

export async function POST(req: Request) {
  const { customer } = await req.json();
  const { succeeded, results } = await ManipulateResults.customerList(customer);
  return NextResponse.json({ succeeded, results });
}

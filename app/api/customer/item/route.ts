import { NextResponse } from 'next/server';
import * as ManipulateResults from '@/data/results';

export async function POST(req: Request) {
  const { id } = await req.json();
  const { succeeded, result } = await ManipulateResults.customerItem(id);
  return NextResponse.json({ succeeded, result });
}

import { NextResponse } from 'next/server';
import * as ManipulateCustomers from '@/data/customer';

export async function POST(req: Request) {
  const { name, birth } = await req.json();
  const { succeeded, id } = await ManipulateCustomers.readOne(
    name + '_' + birth
  );

  return NextResponse.json({ succeeded, id });
}

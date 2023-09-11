import { NextResponse } from 'next/server';
import * as ManipulateUsers from '@/data/users';

export async function POST(req: Request) {
  const { name, birth } = await req.json();
  const { succeeded, id } = await ManipulateUsers.readOne(name + ' ' + birth);

  return NextResponse.json({ succeeded, id });
}

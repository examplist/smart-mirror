import { NextResponse } from 'next/server';
import * as ManipulateAdmins from '@/data/admins';

export async function POST(req: Request) {
  const { id: reqId, password } = await req.json();
  const { noExist, internalError, id } = await ManipulateAdmins.readOne(
    reqId,
    password
  );

  return NextResponse.json({ noExist, internalError, id });
}

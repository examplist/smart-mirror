import { ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from './connection';
import { faceInfoToDBString } from '@/utils/face';
import { timeToString } from '@/utils/time';

interface Part {
  accMoveLeft: number;
  accMoveRight: number;
  maxMeasureLeft: number;
  maxMeasureRight: number;
  symmetry: number;
}

export interface Expression {
  cheek: Part;
  eye: Part;
  eyebrow: Part;
  mouse: Part;
}

interface Result {
  user_name: string;
  user_birth: string;
  smile: Expression;
  laugh: Expression;
  closeEye: Expression;
  openEye: Expression;
  time: string;
}

export async function add(
  uuid: string,
  user: string,
  smile: Expression,
  laugh: Expression,
  closeEye: Expression,
  openEye: Expression,
  time: string
) {
  const query =
    'INSERT INTO `results` (uuid, time, smile, laugh, closeEye, openEye, user) ' +
    'VALUES (?, ?, ?, ?, ?, ?, ?)';

  try {
    const response = await connection.query<ResultSetHeader>(query, [
      uuid,
      time,
      faceInfoToDBString(smile),
      faceInfoToDBString(laugh),
      faceInfoToDBString(closeEye),
      faceInfoToDBString(openEye),
      user,
    ]);
    // 갑자기 왜 배열로 받지?, promise여서 그런 것 같다.
    return { result: '성공', id: response[0].insertId };
  } catch (error) {
    console.error(error);
    return { result: '실패', id: null };
  }
}

export async function customerList(customer: string) {
  try {
    const query = 'SELECT * FROM `results` WHERE user = ?';
    const [rows] = await connection.execute<RowDataPacket[]>(query, [customer]);

    // 시간 형식 바꾸기
    for (const row of rows) {
      row.time = timeToString(row.time);
    }

    return {
      succeeded: true,
      results: rows,
    };
  } catch (error) {
    console.error(error);
    return {
      succeeded: false,
      results: null,
    };
  }
}

export async function customerItem(uuid: string) {
  try {
    const query = 'SELECT * FROM `results` WHERE uuid = ?';
    const [rows] = await connection.execute<RowDataPacket[]>(query, [uuid]);
    return {
      succeeded: true,
      result: rows[0],
    };
  } catch (error) {
    console.error(error);
    return {
      succeeded: false,
      result: null,
    };
  }
}

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

export async function adminList(
  customerName: string,
  customerBirth: string,
  dateFront: string,
  dateBack: string
) {
  const pre = 'SELECT * FROM `results`';
  let isWHERE = '';
  let queryCustomer = '';
  let queryDateFront = '';
  let queryDateBack = '';
  let prevCondition = false;

  if (customerName !== '' && customerBirth !== '') {
    isWHERE = ' WHERE ';
    queryCustomer = `user = '${customerName}_${customerBirth}'`;
    prevCondition = true;
  }

  if (dateFront !== '') {
    isWHERE = ' WHERE ';
    queryDateFront = `time >= '${dateFront} 00:00:00'`;
    if (prevCondition) {
      queryDateFront = ' AND ' + queryDateFront;
    }
    prevCondition = true;
  }

  if (dateBack !== '') {
    isWHERE = ' WHERE ';
    queryDateBack = `time <= '${dateBack} 23:59:59'`;
    if (prevCondition) {
      queryDateBack = ' AND ' + queryDateBack;
    }
  }

  const query = pre + isWHERE + queryCustomer + queryDateFront + queryDateBack;

  try {
    const [rows] = await connection.execute<RowDataPacket[]>(query);
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

import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { faceInfoToDBString } from '@/utils/face';

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
  user: string,
  smile: Expression,
  laugh: Expression,
  closeEye: Expression,
  openEye: Expression,
  time: string
) {
  const query =
    'INSERT INTO `results` (time, smile, laugh, closeEye, openEye, user)' +
    'VALUES (?, ?, ?, ?, ?, ?)';

  try {
    const response = await connection.query<ResultSetHeader>(query, [
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

// export async function reflectUserId(id: number, name: string, birth: string) {
//   const query1 = 'SET sql_safe_updates = 0;';
//   const query2 =
//     'UPDATE results SET user_id = ?, user_name = NULL, user_birth = NULL' +
//     ' ' +
//     'WHERE user_name = ? AND user_birth = ?';

//   try {
//     await connection.execute(query1);
//     await connection.execute(query2, [id, name, birth]);
//   } catch (error) {
//     console.log('reflectUserId 에러');
//     console.error(error);
//   }
// }

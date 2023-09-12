import { RowDataPacket } from 'mysql2';
import connection from './connection';

export async function readOne(id: string, pw: string) {
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM `admins` WHERE id = ? AND pw = ?',
      [id, pw]
    );

    return {
      succeeded: true,
      id: rows[0].id,
    };
  } catch (error) {
    console.error(error);

    return {
      succeeded: false,
      id: null,
    };
  }
}

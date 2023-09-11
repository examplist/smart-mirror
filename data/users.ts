import { RowDataPacket } from 'mysql2';
import connection from './connection';

export async function readOne(user: string) {
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM `users` WHERE id = ?',
      [user]
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

// const query = 'SELECT * FROM `users` WHERE name = ? AND birth = ?';
// const [rows] = await connection.execute(query, ['name1', '2000-01-01']);
// console.log({ rows });

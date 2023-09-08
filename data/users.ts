import { RowDataPacket } from 'mysql2';
import connection from './connection';

export async function readOne(user_name: string, user_birth: string) {
  const query = 'SELECT * FROM `users` WHERE name = ? AND birth = ?';

  try {
    const [rows] = await connection.execute<RowDataPacket[]>(query, [
      user_name,
      user_birth,
    ]);

    // return rows[0];
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

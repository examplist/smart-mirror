import { RowDataPacket } from 'mysql2';
import connection from './connection';

export async function readOne(customer: string) {
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM `customers` WHERE id = ?',
      [customer]
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

import { RowDataPacket } from 'mysql2';
import connection from './connection';

export async function readOne(customer: string) {
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM `customers` WHERE id = ?',
      [customer]
    );

    if (rows.length === 0) {
      return {
        noExist: true,
        internalError: false,
        id: null,
      };
    } else {
      return {
        noExist: false,
        internalError: false,
        id: rows[0].id,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      noExist: false,
      internalError: true,
      id: null,
    };
  }
}

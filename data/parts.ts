import { RowDataPacket } from 'mysql2';
import connection from './connection';
import { timeToString } from '@/utils/time';

export async function add(
  exp_name: string,
  exp_obj: any,
  result_id: number,
  customer: string,
  time: string
) {
  let query1;
  let query2;

  for (const part in exp_obj) {
    let queryPartFront = '';
    let queryPartBack = '';
    for (const move in exp_obj[part]) {
      query1 = `INSERT INTO ${part} (expression, result, customer, time, `;
      query2 = `) VALUES (?, ?, ?, ?, `;
      queryPartFront += move + ', ';
      queryPartBack += exp_obj[part][move].toString() + ', ';
    }
    const query =
      query1 +
      queryPartFront.substring(0, queryPartFront.length - 2) +
      query2 +
      queryPartBack.substring(0, queryPartBack.length - 2) +
      ');';

    try {
      connection.execute(query, [exp_name, result_id, customer, time]);
    } catch (error) {
      console.log('part create 에러');
      console.error(error);
      return '실패';
    }
  }

  return '성공';
}

export async function adminList(
  customerName: string,
  customerBirth: string,
  dateFront: string,
  dateBack: string,
  expression: string,
  part: string,
  move: string,
  valueMin: string,
  valueMax: string
) {
  const pre = `SELECT DISTINCT
    results.id AS id, uuid, smile, laugh, closeEye, openEye, results.customer AS customer, results.time AS time
    FROM ${part} JOIN results ON ${part}.result = results.id
    WHERE `;
  let queryExpression = '';
  let queryCustomer = '';
  let queryDateFront = '';
  let queryDateBack = '';
  let queryValueMin = '';
  let queryValueMax = '';
  let prevCondition = false;

  if (expression !== '') {
    queryExpression = `expression = '${expression}'`;
    prevCondition = true;
  }

  if (customerName !== '' && customerBirth !== '') {
    queryCustomer = `results.customer = '${customerName}_${customerBirth}'`;
    if (prevCondition) {
      queryCustomer = ' AND ' + queryCustomer;
    }
    prevCondition = true;
  }

  if (dateFront !== '') {
    queryDateFront = `time >= '${dateFront} 00:00:00'`;
    if (prevCondition) {
      queryDateFront = ' AND ' + queryDateFront;
    }
    prevCondition = true;
  }

  if (dateBack !== '') {
    queryDateBack = `time <= '${dateBack} 23:59:59'`;
    if (prevCondition) {
      queryDateBack = ' AND ' + queryDateBack;
    }
    prevCondition = true;
  }

  if (valueMin !== '') {
    queryValueMin = `${move} >= ${valueMin}`;
    if (prevCondition) {
      queryValueMin = ' AND ' + queryValueMin;
    }
    prevCondition = true;
  }

  if (valueMax !== '') {
    queryValueMax = `${move} <= ${valueMax}`;
    if (prevCondition) {
      queryValueMax = ' AND ' + queryValueMax;
    }
    prevCondition = true;
  }

  const query =
    pre +
    queryExpression +
    queryCustomer +
    queryDateFront +
    queryDateBack +
    queryValueMin +
    queryValueMax;

  console.log({ query });

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

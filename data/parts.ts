import { RowDataPacket } from 'mysql2';
import connection from './connection';
import { readTimeToString } from '@/utils/time';

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
  valueMax: string,
  page: number
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
  let queryPage = ` ORDER BY results.time DESC LIMIT ${(page - 1) * 4} , 4`;
  let prevCondition = false;
  let queryCountCustomer = '';
  let queryCountDateFront = '';
  let queryCountDateBack = '';

  if (expression !== '') {
    queryExpression = `expression = '${expression}'`;
    prevCondition = true;
  }

  if (customerName !== '' && customerBirth !== '') {
    queryCustomer = `results.customer = '${customerName}_${customerBirth}'`;
    queryCountCustomer = `customer = '${customerName}_${customerBirth}'`;
    if (prevCondition) {
      queryCustomer = ' AND ' + queryCustomer;
      queryCountCustomer = ' AND ' + queryCountCustomer;
    }
    prevCondition = true;
  }

  if (dateFront !== '') {
    queryDateFront = `results.time >= '${dateFront} 00:00:00'`;
    queryCountDateFront = `time >= '${dateFront} 00:00:00'`;
    if (prevCondition) {
      queryDateFront = ' AND ' + queryDateFront;
      queryCountDateFront = ' AND ' + queryCountDateFront;
    }
    prevCondition = true;
  }

  if (dateBack !== '') {
    queryDateBack = `results.time <= '${dateBack} 23:59:59'`;
    queryCountDateBack = `time <= '${dateBack} 23:59:59'`;
    if (prevCondition) {
      queryDateBack = ' AND ' + queryDateBack;
      queryCountDateBack = ' AND ' + queryCountDateBack;
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
    queryValueMax +
    queryPage;

  const queryCount =
    `SELECT COUNT(*) AS count FROM ${part} WHERE ` +
    queryExpression +
    queryCountCustomer +
    queryCountDateFront +
    queryCountDateBack +
    queryValueMin +
    queryValueMax;

  try {
    const [rowsCount] = await connection.execute<RowDataPacket[]>(queryCount);
    const [rows] = await connection.execute<RowDataPacket[]>(query);
    for (const row of rows) {
      row.time = readTimeToString(row.time);
    }

    return {
      succeeded: true,
      results: rows,
      count: rowsCount[0].count,
    };
  } catch (error) {
    console.error(error);
    return {
      succeeded: false,
      results: null,
    };
  }
}

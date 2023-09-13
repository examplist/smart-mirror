import connection from './connection';

export async function add(
  exp_name: string,
  exp_obj: any,
  result_id: number,
  user: string,
  time: string
) {
  let query1;
  let query2;

  for (const part in exp_obj) {
    let queryPartFront = '';
    let queryPartBack = '';
    for (const move in exp_obj[part]) {
      query1 = `INSERT INTO ${part} (expression, result, user, time, `;
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
      connection.execute(query, [exp_name, result_id, user, time]);
    } catch (error) {
      console.log('part create 에러');
      console.error(error);
      return '실패';
    }
  }

  return '성공';
}

export async function readMany(
  part: string,
  user: string,
  time: string,
  expression: string,
  move: string,
  minValue: string,
  maxValue: string
) {}

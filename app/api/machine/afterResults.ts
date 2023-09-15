import * as ManipulateResults from '@/data/results';
import * as ManipulateParts from '@/data/parts';

export default async function (
  customer: string,
  obj: Record<string, ManipulateResults.Expression>,
  time: string,
  results_id: number
) {
  const { smile, laugh, closeEye, openEye } = obj;
  // 각 부위별로 저장하기
  ManipulateParts.add('smile', smile, results_id, customer, time);
  ManipulateParts.add('laugh', laugh, results_id, customer, time);
  ManipulateParts.add('closeEye', closeEye, results_id, customer, time);
  ManipulateParts.add('openEye', openEye, results_id, customer, time);
}

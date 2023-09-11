import * as ManipulateResults from '@/data/results';
import * as ManipulateParts from '@/data/parts';

export default async function (
  user: string,
  smile: ManipulateResults.Expression,
  laugh: ManipulateResults.Expression,
  closeEye: ManipulateResults.Expression,
  openEye: ManipulateResults.Expression,
  time: string,
  results_id: number
) {
  // 각 부위별로 저장하기
  ManipulateParts.add('smile', smile, results_id, user, time);
  ManipulateParts.add('laugh', laugh, results_id, user, time);
  ManipulateParts.add('closeEye', closeEye, results_id, user, time);
  ManipulateParts.add('openEye', openEye, results_id, user, time);
}

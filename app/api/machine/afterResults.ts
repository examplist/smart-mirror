import * as ManipulateResults from '@/data/results';
import * as ManipulateUsers from '@/data/users';
import * as ManipulateParts from '@/data/parts';

export default async function (
  user_name: string,
  user_birth: string,
  smile: ManipulateResults.Expression,
  laugh: ManipulateResults.Expression,
  closeEye: ManipulateResults.Expression,
  openEye: ManipulateResults.Expression,
  time: string,
  results_id: number
) {
  // 아이디 반영하기
  const { succeeded, id: user_id } = await ManipulateUsers.readOne(
    user_name,
    user_birth
  );

  if (!succeeded) {
    console.log('고객 아이디를 불러오는 데 문제가 발생합니다.');
    return;
  }

  ManipulateResults.reflectUserId(user_id, user_name, user_birth);

  // 각 부위별로 저장하기
  ManipulateParts.create('smile', smile, results_id, user_id, time);
  ManipulateParts.create('laugh', laugh, results_id, user_id, time);
  ManipulateParts.create('closeEye', closeEye, results_id, user_id, time);
  ManipulateParts.create('openEye', openEye, results_id, user_id, time);
}

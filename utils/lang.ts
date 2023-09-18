export function expressionToKor(str: string) {
  const obj = {
    smile: '미소짓기',
    laugh: '크게웃기',
    closeEye: '눈감기',
    openEye: '눈크게뜨기',
  };

  return obj[str];
}

export function moveToKor(str: string) {
  const obj = {
    accMoveLeft: '좌_누적이동량',
    maxMeasureLeft: '좌_최대실측치',
    accMoveRight: '우_누적이동량',
    maxMeasureRight: '우_최대실측치',
    symmetry: '좌우대칭성점수',
  };

  return obj[str];
}

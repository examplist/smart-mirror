export function expressionToKor(str: string) {
  const obj = {
    smile: '미소짓기',
    laugh: '크게웃기',
    closeEye: '눈감기',
    openEye: '눈크게뜨기',
  };

  return obj[str];
}

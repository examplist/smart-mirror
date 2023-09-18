import { Expression } from '@/data/results';

function moveObjToArr(part: any) {
  const arr = [];
  arr.push(part.accMoveLeft);
  arr.push(part.maxMeasureLeft);
  arr.push(part.accMoveRight);
  arr.push(part.maxMeasureRight);
  arr.push(part.symmetry);
  return arr;
}

export function faceInfoToDBString(obj: Expression) {
  const { eyebrow, eye, cheek, mouse } = obj;

  const arr = [];
  arr.push(
    moveObjToArr(eyebrow),
    moveObjToArr(eye),
    moveObjToArr(cheek),
    moveObjToArr(mouse)
  );

  return JSON.stringify(arr);
}

export function getExpDataFromString(str: string, expression: string) {
  // [[1,3,5,7,9],[9,7,5,3,1],[2,4,6,8,10],[10,8,6,4,2]]
  const parsed = JSON.parse(str);

  switch (expression) {
    case 'eyebrow':
      return parsed[0];
    case 'eye':
      return parsed[1];
    case 'cheek':
      return parsed[2];
    case 'mouse':
      return parsed[3];
    default:
      return;
  }
}

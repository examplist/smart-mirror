import { Expression } from '@/data/results';

function moveObjToArr(part) {
  const arr = [];
  arr.push(part.accMoveLeft);
  arr.push(part.accMoveRight);
  arr.push(part.maxMeasureLeft);
  arr.push(part.maxMeasureRight);
  arr.push(part.symmetry);
  return arr;
}

export function faceInfoToDBString(obj: Expression) {
  const { cheek, eye, eyebrow, mouse } = obj;

  const arr = [];
  arr.push(
    moveObjToArr(cheek),
    moveObjToArr(eye),
    moveObjToArr(eyebrow),
    moveObjToArr(mouse)
  );

  return JSON.stringify(arr);
}

export function faceInfoDBStringToObject(arr) {
  const obj = {
    accMoveLeft: undefined,
    accMoveRight: undefined,
    maxMeasureLeft: undefined,
    maxMeasureRight: undefined,
    symmetry: undefined,
  };

  obj.accMoveLeft = arr[0];
  obj.accMoveRight = arr[1];
  acc.maxMeasureLeft = arr[2];
  acc.maxMeasureRight = arr[3];
  obj.symmetry = arr[4];

  return obj;
}

import { useState, useRef, FormEvent } from 'react';
import Chart from './Chart';
import { getExpDataFromString } from '@/utils/face';
import style from '@/styles/customer/chart/List.module.scss';

export interface Move {
  value: number;
  time: string;
}

export default function List({ customer }: { customer: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [accMoveLeft, setAccMoveLeft] = useState<Move[]>([]);
  const [maxMeasureLeft, setMaxMeasureLeft] = useState<Move[]>([]);
  const [accMoveRight, setAccMoveRight] = useState<Move[]>([]);
  const [maxMeasureRight, setMaxMeasureRight] = useState<Move[]>([]);
  const [symmetry, setSymmetry] = useState<Move[]>([]);

  const refExpression = useRef<HTMLSelectElement>(null);
  const refPart = useRef<HTMLSelectElement>(null);

  async function getCharts() {
    const inputExpression = refExpression.current?.value;
    const inputPart = refPart.current?.value;
    if (inputExpression === undefined || inputPart === undefined) {
      alert('죄송합니다. 문제가 발생했습니다.');
      return;
    }
    if (inputExpression === '' || inputPart === '') {
      alert('모든 항목을 입력하셔야 합니다!');
      return;
    }
    setLoading(true);
    const response = await fetch('/api/customer/chart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer,
        expression: inputExpression,
      }),
    });
    const { succeeded, results } = await response.json();
    const arrAccMoveLeft: Move[] = [];
    const arrMaxMeasureLeft: Move[] = [];
    const arrAccMoveRight: Move[] = [];
    const arrMaxMeasureRight: Move[] = [];
    const arrSymmetry: Move[] = [];
    if (!succeeded) {
      alert('죄송합니다. 문제가 발생했습니다.');
      setLoading(false);
    } else {
      results.forEach((result: any) => {
        const congregated = getExpDataFromString(
          result[inputExpression],
          inputPart
        );
        const time = result.time;
        arrAccMoveLeft.push({ value: congregated[0], time });
        arrMaxMeasureLeft.push({ value: congregated[1], time });
        arrAccMoveRight.push({ value: congregated[2], time });
        arrMaxMeasureRight.push({ value: congregated[3], time });
        arrSymmetry.push({ value: congregated[4], time });
      });
      setAccMoveLeft(arrAccMoveLeft.reverse());
      setMaxMeasureLeft(arrMaxMeasureLeft.reverse());
      setAccMoveRight(arrAccMoveRight.reverse());
      setMaxMeasureRight(arrMaxMeasureRight.reverse());
      setSymmetry(arrSymmetry.reverse());
      setLoading(false);
    }
  }

  const submit$form = async (e: FormEvent) => {
    e.preventDefault();
    getCharts();
  };

  return (
    <main className={style['main']}>
      <form className={style['form']} onSubmit={submit$form}>
        <div className={style['search']}>
          <div className={style['expression']}>
            <label>표정:</label>
            <select name="expression" ref={refExpression}>
              <option value="">선택 안 함</option>
              <option value="smile">미소짓기</option>
              <option value="laugh">크게웃기</option>
              <option value="closeEye">눈감기</option>
              <option value="openEye">눈크게뜨기</option>
            </select>
          </div>
          <div className={style['part']}>
            <label>부위:</label>
            <select name="part" ref={refPart}>
              <option value="">선택 안 함</option>
              <option value="eyebrow">눈썹</option>
              <option value="eye">눈</option>
              <option value="cheek">뺨</option>
              <option value="mouse">입</option>
            </select>
          </div>
        </div>
        <div className={style['submit']}>
          <input type="submit" value="검색" disabled={loading} />
        </div>
      </form>
      <section className={style['charts']}>
        <div className={style['chart']}>
          <Chart moveType={'accMoveLeft'} moveData={accMoveLeft} />
        </div>
        <div className={style['chart']}>
          <Chart moveType={'maxMeasureLeft'} moveData={maxMeasureLeft} />
        </div>
        <div className={style['chart']}>
          <Chart moveType={'accMoveRight'} moveData={accMoveRight} />
        </div>
        <div className={style['chart']}>
          <Chart moveType={'maxMeasureRight'} moveData={maxMeasureRight} />
        </div>
        <div className={style['chart']}>
          <Chart moveType={'symmetry'} moveData={symmetry} />
        </div>
      </section>
    </main>
  );
}

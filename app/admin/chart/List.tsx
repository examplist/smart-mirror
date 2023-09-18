import { useState, useRef, FormEvent } from 'react';
import style from '@/styles/admin/chart/List.module.scss';
import Chart from './Chart';
import { getExpDataFromString } from '@/utils/face';

export interface Move {
  value: number;
  time: string;
}

export default function List() {
  const [accMoveLeft, setAccMoveLeft] = useState<Move[]>([]);
  const [maxMeasureLeft, setMaxMeasureLeft] = useState<Move[]>([]);
  const [accMoveRight, setAccMoveRight] = useState<Move[]>([]);
  const [maxMeasureRight, setMaxMeasureRight] = useState<Move[]>([]);
  const [symmetry, setSymmetry] = useState<Move[]>([]);

  const refCustomerName = useRef<HTMLInputElement>(null);
  const refCustomerBirth = useRef<HTMLInputElement>(null);
  const refExpression = useRef<HTMLSelectElement>(null);
  const refPart = useRef<HTMLSelectElement>(null);

  async function getCharts() {
    const inputCustomerName = refCustomerName.current?.value;
    const inputCustomerBirth = refCustomerBirth.current?.value;
    const inputExpression = refExpression.current?.value;
    const inputPart = refPart.current?.value;

    if (inputExpression === undefined || inputPart === undefined) {
      alert('죄송합니다. 문제가 발생했습니다.');
      return;
    }

    if (
      inputCustomerName === '' ||
      inputCustomerBirth === '' ||
      inputExpression === '' ||
      inputPart === ''
    ) {
      alert('모든 항목을 입력하셔야 합니다!');
      return;
    }

    const response = await fetch('/api/admin/chart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerName: inputCustomerName,
        customerBirth: inputCustomerBirth,
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
      alert('문제 발생');
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
    }
  }

  const submit$form = async (e: FormEvent) => {
    e.preventDefault();
    getCharts();
  };

  return (
    <main className={style['main']}>
      <form className={style['form']} onSubmit={submit$form}>
        <div className={style['customer']}>
          <div>이름</div>
          <input type="text" ref={refCustomerName} />
          <div className={style['name']}>생년월일</div>
          <input type={'date'} ref={refCustomerBirth} />
          <label>표정:</label>
          <select name="expression" ref={refExpression}>
            <option value="">선택 안 함</option>
            <option value="smile">미소짓기</option>
            <option value="laugh">크게웃기</option>
            <option value="closeEye">눈감기</option>
            <option value="openEye">눈크게뜨기</option>
          </select>
          <label>부위:</label>
          <select name="part" ref={refPart}>
            <option value="">선택 안 함</option>
            <option value="eyebrow">눈썹</option>
            <option value="eye">눈</option>
            <option value="cheek">뺨</option>
            <option value="mouse">입</option>
          </select>
        </div>
        <div className={style['explanation']}>
          <h3>사용법</h3>
          <p>고객을 지정하는 경우, 이름과 생년월일을 모두 입력하셔야 합니다.</p>
        </div>
        <div className={style['submit']}>
          <input type="submit" value="검색" />
        </div>
      </form>
      <section className={style['lists']}>
        <div className={style['items_list']}></div>
      </section>
      <section>
        <Chart moveType={'accMoveLeft'} moveData={accMoveLeft} />
        <Chart moveType={'maxMeasureLeft'} moveData={maxMeasureLeft} />
        <Chart moveType={'accMoveRight'} moveData={accMoveRight} />
        <Chart moveType={'maxMeasureRight'} moveData={maxMeasureRight} />
        <Chart moveType={'symmetry'} moveData={symmetry} />
      </section>
    </main>
  );
}

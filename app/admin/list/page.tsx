'use client';

import { useAuthStore } from '@/store/auth';
import { useEffect, useState, useRef, FormEvent } from 'react';
import { FAILED, FETCHED } from '@/store/auth';
// import List from './List';
import style from '@/styles/admin/list/page.module.scss';

export default function adminList() {
  const { customer_status, customer_id } = useAuthStore();
  const refCustomerName = useRef<HTMLInputElement>(null);
  const refCustomerBirth = useRef<HTMLInputElement>(null);
  const refDateFront = useRef<HTMLInputElement>(null);
  const refDateBack = useRef<HTMLInputElement>(null);
  const refExpression = useRef<HTMLSelectElement>(null);
  const refPart = useRef<HTMLSelectElement>(null);
  const refMove = useRef<HTMLSelectElement>(null);
  const refValueMin = useRef<HTMLInputElement>(null);
  const refValueMax = useRef<HTMLInputElement>(null);

  useEffect(() => {}, []);

  const submit$form = async (e: FormEvent) => {
    e.preventDefault();

    const inputCustomerName = refCustomerName.current?.value;
    const inputCustomerBirth = refCustomerBirth.current?.value;
    const inputDateFront = refDateFront.current?.value;
    const inputDateBack = refDateBack.current?.value;
    const inputExpression = refExpression.current?.value;
    const inputPart = refPart.current?.value;
    const inputMove = refMove.current?.value;
    const inputValueMin = refValueMin.current?.value;
    const inputValueMax = refValueMax.current?.value;

    const response = await fetch('/api/admin/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerName: inputCustomerName,
        customerBirth: inputCustomerBirth,
        dateFront: inputDateFront,
        dateBack: inputDateBack,
        expression: inputExpression,
        part: inputPart,
        move: inputMove,
        valueMin: inputValueMin,
        valueMax: inputValueMax,
      }),
    });

    const { succeeded, results } = await response.json();

    if (!succeeded) {
      alert('문제 발생');
    } else {
      console.log(results);
    }
  };

  if (customer_status === FAILED || customer_id === null) {
    return <main>로그인을 하셔야 합니다.</main>;
  }

  if (customer_status === FETCHED) {
    return (
      <main className={style['main']}>
        <form className={style['form']} onSubmit={submit$form}>
          <div className={style['customer']}>
            <label>고객:</label>
            <div className={style['name']}>이름 -</div>
            <input type="text" ref={refCustomerName} />
            <div className={style['name']}>생년월일 -</div>
            <input type={'date'} ref={refCustomerBirth} />
          </div>
          <div className={style['date']}>
            <label>날짜:</label>
            <input type="date" ref={refDateFront} />
            <div className={style['tilde']}>~</div>
            <input type="date" ref={refDateBack} />
          </div>
          <div className={style['field']}>
            <label>부분:</label>
            <select name="expression" ref={refExpression}>
              <option value="">선택 안 함</option>
              <option value="smile">미소짓기</option>
              <option value="laugh">크게웃기</option>
              <option value="closeEye">눈감기</option>
              <option value="openEye">눈크게뜨기</option>
            </select>
            <select name="part" ref={refPart}>
              <option value="">선택 안 함</option>
              <option value="cheek">뺨</option>
              <option value="eye">눈</option>
              <option value="eyebrow">눈썹</option>
              <option value="mouse">입</option>
            </select>
            <select name="move" ref={refMove}>
              <option value="">선택 안 함</option>
              <option value="accMoveLeft">좌_누적이동량</option>
              <option value="accMoveRight">우_누적이동량</option>
              <option value="maxMeasureLeft">좌_최대실측치</option>
              <option value="maxMeasureRight">우_최대실측치</option>
              <option value="symmetry">좌우대칭성점수</option>
            </select>
            <input type="text" placeholder="최소치" ref={refValueMin} />
            <div className={style['tilde']}>~</div>
            <input type="text" placeholder="최대치" ref={refValueMax} />
          </div>
          <div className={style['explanation']}>
            <h3>사용법</h3>
            <p>
              고객을 지정하는 경우, 이름과 생년월일을 모두 입력하셔야 합니다.
            </p>
            <p>고객을 지정하지 않으면 전체 고객이 조회됩니다.</p>
            <p>
              날짜에서 입력한 날짜도 포함됩니다. 예를 들어 시작하는 날짜를
              2023년 7월 7일로 한 경우 2023년 7월 7일도 포함됩니다.
            </p>
            <p>
              날짜는 한쪽만 입력하셔도 됩니다. 예를 들어 끝나는 날짜를 2023년
              7월 7일로 한 경우, 그 이전의 날짜들도 포함됩니다.
            </p>
            <p>부분에서는 표정, 부위, 움직임 모두 선택하셔야 합니다.</p>
            <p>
              부분에서 수치는 입력한 수치를 포함합니다. 예를 들어 시작하는
              숫자를 1로 했다면 1도 포함됩니다.
            </p>
          </div>
          <div className={style['submit']}>
            <input type="submit" value="검색" />
          </div>
        </form>
      </main>
    );
  }

  return <main>로딩 중</main>;
}

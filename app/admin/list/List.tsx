'use client';

interface AdminItem {
  customer_name: string;
  customer_birth: string;
  time: string;
  uuid: string;
}

import { useState, useRef, FormEvent } from 'react';
import Item from './Item';
import Paginate from './Paginate';
import style from '@/styles/admin/list/List.module.scss';

export default function List() {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<AdminItem[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);

  const refCustomerName = useRef<HTMLInputElement>(null);
  const refCustomerBirth = useRef<HTMLInputElement>(null);
  const refDateFront = useRef<HTMLInputElement>(null);
  const refDateBack = useRef<HTMLInputElement>(null);
  const refExpression = useRef<HTMLSelectElement>(null);
  const refPart = useRef<HTMLSelectElement>(null);
  const refMove = useRef<HTMLSelectElement>(null);
  const refValueMin = useRef<HTMLInputElement>(null);
  const refValueMax = useRef<HTMLInputElement>(null);

  async function getLists(page: number) {
    const inputCustomerName = refCustomerName.current?.value;
    const inputCustomerBirth = refCustomerBirth.current?.value;
    const inputDateFront = refDateFront.current?.value;
    const inputDateBack = refDateBack.current?.value;
    const inputExpression = refExpression.current?.value;
    const inputPart = refPart.current?.value;
    const inputMove = refMove.current?.value;
    const inputValueMin = refValueMin.current?.value;
    const inputValueMax = refValueMax.current?.value;

    setLoading(true);
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
        page,
      }),
    });
    const { succeeded, results, count } = await response.json();
    if (!succeeded) {
      alert('죄송합니다. 문제가 발생했습니다.');
      setLoading(false);
    } else {
      const resultsCustomerSplitted = results.map((result: any) => {
        const [customer_name, customer_birth] = result.customer.split('_');
        return {
          customer_name,
          customer_birth,
          time: result.time,
          uuid: result.uuid,
        };
      });
      setItems(resultsCustomerSplitted);
      setPageCount(Math.ceil(count / 4));
      setLoading(false);
    }
  }

  const submit$form = async (e: FormEvent) => {
    e.preventDefault();
    getLists(1);
  };

  return (
    <main className={style['main']}>
      <form className={style['form']} onSubmit={submit$form}>
        <div className={style['customer']}>
          <label>고객:</label>
          <div className={style['name']}>
            <div>이름 - </div>
            <input type="text" ref={refCustomerName} />
          </div>
          <div className={style['birth']}>
            <div>생년월일 - </div>
            <input
              type={'text'}
              placeholder={'예) 2023-09-11'}
              ref={refCustomerBirth}
            />
          </div>
        </div>
        <div className={style['date']}>
          <label>날짜:</label>
          <div className={style['inputs']}>
            <input type="date" ref={refDateFront} />
            <div className={style['tilde']}>~</div>
            <input type="date" ref={refDateBack} />
          </div>
        </div>
        <div className={style['field']}>
          <label>부분:</label>
          <div className={style['selects']}>
            <select name="expression" ref={refExpression}>
              <option value="">선택 안 함</option>
              <option value="smile">미소짓기</option>
              <option value="laugh">크게웃기</option>
              <option value="closeEye">눈감기</option>
              <option value="openEye">눈크게뜨기</option>
            </select>
            <select name="part" ref={refPart}>
              <option value="">선택 안 함</option>
              <option value="eyebrow">눈썹</option>
              <option value="eye">눈</option>
              <option value="cheek">뺨</option>
              <option value="mouse">입</option>
            </select>
            <select name="move" ref={refMove} className={style['move']}>
              <option value="">선택 안 함</option>
              <option value="accMoveLeft">좌_누적이동량</option>
              <option value="maxMeasureLeft">좌_최대실측치</option>
              <option value="accMoveRight">우_누적이동량</option>
              <option value="maxMeasureRight">우_최대실측치</option>
              <option value="symmetry">좌우대칭성점수</option>
            </select>
          </div>
          <div className={style['figures']}>
            <input type="text" placeholder="최소치" ref={refValueMin} />
            <div className={style['tilde']}>~</div>
            <input type="text" placeholder="최대치" ref={refValueMax} />
          </div>
        </div>
        <div className={style['explanation']}>
          <h3>사용법</h3>
          <p>고객을 지정하는 경우, 이름과 생년월일을 모두 입력하셔야 합니다.</p>
          <p>고객을 지정하지 않으면 전체 고객이 조회됩니다.</p>
          <p>
            날짜에서 입력한 날짜도 포함됩니다. 예를 들어 시작하는 날짜를 2023년
            7월 7일로 한 경우 2023년 7월 7일도 포함됩니다.
          </p>
          <p>
            날짜는 한쪽만 입력하셔도 됩니다. 예를 들어 끝나는 날짜를 2023년 7월
            7일로 한 경우, 그 이전의 날짜들도 포함됩니다.
          </p>
          <p>부분에서는 표정, 부위, 움직임 모두 선택하셔야 합니다.</p>
          <p>
            부분에서 수치는 입력한 수치를 포함합니다. 예를 들어 시작하는 숫자를
            1로 했다면 1도 포함됩니다.
          </p>
          <p style={{ color: 'red' }}>
            새롭게 검색을 하시는 경우, 새로고침을 하고 하시기 바랍니다.
          </p>
        </div>
        <div className={style['submit']}>
          <input type="submit" value="검색" disabled={loading} />
        </div>
      </form>
      <section className={style['lists']}>
        <div className={style['inner-container']}>
          <div className={style['items_list_name']}>
            <div className={style['name']}>이름</div>
            <div className={style['birth']}>생년월일</div>
            <div className={style['time']}>시간</div>
            <div className={style['link']}>링크</div>
          </div>
          <div className={style['items_list']}>
            {items.map((item) => {
              const { customer_name, customer_birth, time, uuid } = item;
              return (
                <Item
                  key={uuid}
                  customer_name={customer_name}
                  customer_birth={customer_birth}
                  time={time}
                  uuid={uuid}
                />
              );
            })}
          </div>
        </div>
      </section>
      <Paginate pageCount={pageCount} getLists={getLists} currentPage={1} />
    </main>
  );
}

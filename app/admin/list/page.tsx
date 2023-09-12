'use client';

import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import { FAILED, FETCHED } from '@/store/auth';
// import List from './List';
import style from '@/styles/customer/list/page.module.scss';

export default function customerList() {
  const { customer_status, customer_id } = useAuthStore();

  useEffect(() => {}, []);

  if (customer_status === FAILED || customer_id === null) {
    return <main>로그인을 하셔야 합니다.</main>;
  }

  if (customer_status === FETCHED) {
    return (
      <main className={style['main']}>
        <form>
          <label>이름</label>
          <input type={'text'} />
          <label>날짜</label>
          <input type={'date'} /> ~ <input type={'date'} />
          <label>측정치</label>
          <label>표정</label>
          <select>
            <option value="smile">미소짓기</option>
            <option value="laugh">크게웃기</option>
            <option value="closeEye">눈감기</option>
            <option value="openEye">눈크게뜨기</option>
          </select>
          <select>
            <option value="smile">좌_누적이동량</option>
            <option value="laugh">우_누적이동량</option>
            <option value="closeEye">좌_최대실측치</option>
            <option value="openEye">우_최대실측치</option>
          </select>
          <input type="submit" value="검색" />
        </form>

        {/* <List customer={customer_id} /> */}
      </main>
    );
  }

  return <main>로딩 중</main>;
}

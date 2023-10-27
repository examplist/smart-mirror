import style from '@/styles/common/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={style['footer']}>
      <div>광운대학교 공간컴퓨팅연구실</div>
      <div className={style['wrapper']}>
        <div>서울특별시 노원구 광운로 20 새빛관 505호</div>
        <div>(우) 01897</div>
      </div>
      <div>02-940-8637</div>
    </footer>
  );
}

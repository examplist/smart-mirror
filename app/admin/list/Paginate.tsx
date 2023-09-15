'use client';

import ReactPaginate from 'react-paginate';
import style from '@/styles/admin/list/Paginate.module.scss';

interface Props {
  pageCount: number;
  currentPage: number;
  getLists: Function;
}
type Click$PageButton = (selectedItem: { selected: number }) => void;

export default function Paginate({ pageCount, currentPage, getLists }: Props) {
  console.log(111111111111);

  const handlePageClick: Click$PageButton = async (event) => {
    await getLists(event.selected + 1);
  };

  return (
    <div className={style['container']} id="category-page__paginate">
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        forcePage={currentPage - 1}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName={style['page-item']}
        pageLinkClassName={style['page-link']}
        previousClassName={style['page-item']}
        previousLinkClassName={style['page-link']}
        nextClassName={style['page-item']}
        nextLinkClassName={style['page-link']}
        breakLabel="..."
        breakClassName={style['page-item']}
        breakLinkClassName={style['page-link']}
        containerClassName={`${style['pagination']} paginate-container`}
        activeClassName={style['active']}
        renderOnZeroPageCount={undefined}
      />
    </div>
  );
}

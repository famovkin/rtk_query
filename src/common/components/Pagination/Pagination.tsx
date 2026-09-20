import { getPaginationPages } from '@/common/utils';
import type { FC } from 'react';

import s from './Pagination.module.css';

type PaginationProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pagesCount: number;
  pageSize: number;
  changePageSize: (size: number) => void;
};

const PAGE_SIZES = [2, 4, 8, 16, 32];

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  pagesCount,
  pageSize,
  changePageSize,
}) => {
  if (pagesCount <= 1) return null;

  const pages = getPaginationPages(currentPage, pagesCount);

  return (
    <div className={s.container}>
      <div className={s.pagination}>
        {pages.map((page, idx) =>
          page === '...' ? (
            <span className={s.ellipsis} key={`ellipsis-${idx}`}>
              ...
            </span>
          ) : (
            <button
              key={page}
              className={
                page === currentPage
                  ? `${s.pageButton} ${s.pageButtonActive}`
                  : s.pageButton
              }
              onClick={() =>
                page !== currentPage && setCurrentPage(Number(page))
              }
              disabled={page === currentPage}
              type="button"
            >
              {page}
            </button>
          ),
        )}
      </div>
      <label>
        Show
        <select
          value={pageSize}
          onChange={(e) => changePageSize(Number(e.target.value))}
        >
          {PAGE_SIZES.map((size) => (
            <option value={size} key={size}>
              {size}
            </option>
          ))}
        </select>
        per page
      </label>
    </div>
  );
};

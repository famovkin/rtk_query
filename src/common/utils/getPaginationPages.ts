const SIBLING_COUNT = 1;

export const getPaginationPages = (
  currentPage: number,
  pagesCount: number,
): (number | '...')[] => {
  if (pagesCount <= 1) return [];

  const pages: (number | '...')[] = [];

  let leftSibling = currentPage - SIBLING_COUNT;
  let rightSibling = currentPage + SIBLING_COUNT;

  if (leftSibling < 2) {
    leftSibling = 2;
  }

  if (rightSibling > pagesCount - 1) {
    rightSibling = pagesCount - 1;
  }

  pages.push(1);

  if (leftSibling > 2) {
    pages.push('...');
  }

  for (let page = leftSibling; page <= rightSibling; page++) {
    pages.push(page);
  }

  if (rightSibling < pagesCount - 1) {
    pages.push('...');
  }

  pages.push(pagesCount);

  return pages;
};

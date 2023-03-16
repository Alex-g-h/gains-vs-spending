import { useEffect, useState } from "react";

function usePaginate(items, count, pageSize = 3) {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const handlePageChange = (pageIndex) => {
    setCurrentPageNumber(pageIndex);
  };

  const itemsCrop = [...items].splice(
    (currentPageNumber - 1) * pageSize,
    pageSize
  );

  /**
   * If selected page is the last page and
   * items count has become not enough for this page then
   * current page force change to previous one.
   */
  useEffect(() => {
    if (count === 0) return;

    const pageCount = Math.ceil(count / pageSize);

    if (pageCount < currentPageNumber) {
      let newPageNumber = currentPageNumber - 1;
      newPageNumber = newPageNumber <= 0 ? 1 : newPageNumber;
      if (newPageNumber !== currentPageNumber) {
        setCurrentPageNumber(newPageNumber);
      }
    }
  }, [count]);

  return {
    handlePageChange,
    itemsCrop,
    currentPageNumber,
  };
}

export default usePaginate;

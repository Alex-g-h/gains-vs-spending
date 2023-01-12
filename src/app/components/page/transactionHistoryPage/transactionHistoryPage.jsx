import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import Transaction from "./transaction";

const TransactionHistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const filteredTransactions = [1];

  const count = filteredTransactions ? filteredTransactions.length : 0;
  const transactionsCrop = paginate(
    filteredTransactions,
    currentPage,
    pageSize
  );

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  /**
   * If selected page is the last page and
   * items count has become not enough for this page then
   * current page force change to previous one.
   */
  useEffect(() => {
    const pageCount = Math.ceil(count / pageSize);
    if (pageCount < currentPage) setCurrentPage(currentPage - 1);
  });

  return (
    <>
      <div className="d-flex">
        <div className="p-2 flex-grow-1">
          {" "}
          <h4>Transaction history</h4>
        </div>
        <div className="p-2 btn border m-1">
          Filter <i className="bi bi-filter"></i>
        </div>
        <div className="p-2 btn border m-1">
          Add transaction <i className="bi bi-plus-circle-fill"></i>
        </div>
      </div>
      {transactionsCrop && transactionsCrop.length > 0 && (
        <div className="d-flex flex-column m-3">
          {" "}
          <Transaction />
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionHistoryPage;

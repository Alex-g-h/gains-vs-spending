import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAccountLoadingStatus } from "../../../store/account";
import { getGains, getGainsLoadingStatus } from "../../../store/gain";
import {
  getSpendings,
  getSpendingLoadingStatus,
} from "../../../store/spending";
import { getCurrentUserId } from "../../../store/user";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import SpinLoading from "../../ui/spinLoading";
import HistoryDataItem from "./historyDataItem";
import TransactionHistoryList from "./transactionHistoryList";

const TransactionHistoryPage = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const accountsLoadingStatus = useSelector(getAccountLoadingStatus());
  const gains = useSelector(getGains(currentUserId));
  const gainsLoadingStatus = useSelector(getGainsLoadingStatus());
  const spending = useSelector(getSpendings(currentUserId));
  const spendingLoadingStatus = useSelector(getSpendingLoadingStatus());

  const pageSize = 3;
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [data, setData] = useState([]);

  const isLoading =
    accountsLoadingStatus || gainsLoadingStatus || spendingLoadingStatus;

  useEffect(() => {
    // accumulate data from gains and from spending in common format
    const commonData = [];
    gains?.forEach((g) =>
      commonData.push(
        HistoryDataItem({
          accountId: g.account_id,
          gainId: g._id,
          date: g.date,
          amount: g.amount,
        })
      )
    );
    spending?.forEach((s) =>
      commonData.push(
        HistoryDataItem({
          accountId: s.account_id,
          spendingId: s._id,
          expenseId: s.expense_id,
          date: s.date,
          amount: s.amount,
          comment: s.comment,
        })
      )
    );

    setData(commonData);
  }, [accountsLoadingStatus, gainsLoadingStatus, spendingLoadingStatus]);

  console.log(data);

  const filteredTransactions = data;

  const count = filteredTransactions ? filteredTransactions.length : 0;
  const transactionsCrop = paginate(
    filteredTransactions,
    currentPageNumber,
    pageSize
  );

  const handlePageChange = (pageIndex) => {
    setCurrentPageNumber(pageIndex);
  };

  /**
   * If selected page is the last page and
   * items count has become not enough for this page then
   * current page force change to previous one.
   */
  useEffect(() => {
    const pageCount = Math.ceil(count / pageSize);
    if (pageCount < currentPageNumber) {
      setCurrentPageNumber(currentPageNumber - 1);
    }
  });

  return (
    <>
      <div className="d-flex mb-2">
        <div className="align-self-center flex-grow-1">
          <h4>Transaction history</h4>
        </div>
        <div className="p-2 btn border mx-1">
          Filter <i className="bi bi-filter"></i>
        </div>
        <div className="p-2 btn border mx-1">
          Add transaction <i className="bi bi-plus-circle-fill"></i>
        </div>
      </div>
      {isLoading ? (
        <SpinLoading />
      ) : (
        transactionsCrop &&
        transactionsCrop.length > 0 && (
          <div className="d-flex flex-column">
            <TransactionHistoryList data={transactionsCrop} />
            <div className="d-flex justify-content-center">
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPageNumber}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )
      )}
    </>
  );
};

export default TransactionHistoryPage;

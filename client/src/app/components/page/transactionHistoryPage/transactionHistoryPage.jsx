import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useModalDelete from "../../../hooks/useModalDelete";
import {
  deleteGainById,
  getGains,
  getGainsLoadingStatus,
} from "../../../store/gain";
import {
  getSpendings,
  getSpendingLoadingStatus,
  deleteSpendingById,
} from "../../../store/spending";
import { getCurrentUserId } from "../../../store/user";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import SpinLoading from "../../ui/spinLoading";
import HistoryDataItem from "./historyDataItem";
import TransactionHistoryList from "./transactionHistoryList";
import _ from "lodash";

const filterOptions = [
  {
    orderBy: "date",
    dir: "asc",
    text: "Early first",
  },
  {
    orderBy: "date",
    dir: "desc",
    text: "Later first",
  },
  {
    orderBy: "amount",
    dir: "asc",
    text: "Increasing amount",
  },
  {
    orderBy: "amount",
    dir: "desc",
    text: "Decreasing amount",
  },
];

const TransactionHistoryPage = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const gains = useSelector(getGains(currentUserId));
  const gainsLoadingStatus = useSelector(getGainsLoadingStatus());
  const spending = useSelector(getSpendings(currentUserId));
  const spendingLoadingStatus = useSelector(getSpendingLoadingStatus());

  const pageSize = 3;
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [data, setData] = useState([]);

  const modalNameForId = "History";
  const { modalConfirmationForm, setModalDataToHandle } =
    useModalDelete(modalNameForId);

  const [filterOptionsIndex, setFilterOptionsIndex] = useState(0);

  const isLoading = gainsLoadingStatus || spendingLoadingStatus;

  useEffect(() => {
    // accumulate data from gains and from spending in common format
    const commonData = [];
    gains?.forEach((g) =>
      commonData.push(
        HistoryDataItem({
          accountId: g.accountId,
          gainId: g._id,
          date: g.date,
          amount: g.amount,
        })
      )
    );
    spending?.forEach((s) =>
      commonData.push(
        HistoryDataItem({
          accountId: s.accountId,
          spendingId: s._id,
          expenseId: s.expenseId,
          date: s.date,
          amount: s.amount,
          comment: s.comment,
        })
      )
    );

    setData(commonData);
  }, [gainsLoadingStatus, spendingLoadingStatus]);

  const filter = filterOptions[filterOptionsIndex];
  const filteredTransactions = _.orderBy(data, filter.orderBy, filter.dir);

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
    if (isLoading || count === 0) return;

    const pageCount = Math.ceil(count / pageSize);

    if (pageCount < currentPageNumber) {
      let newPageNumber = currentPageNumber - 1;
      newPageNumber = newPageNumber <= 0 ? 1 : newPageNumber;
      if (newPageNumber !== currentPageNumber) {
        setCurrentPageNumber(newPageNumber);
      }
    }
  }, [count]);

  /**
   * Delete transaction data
   * @param {*} id { gainId, spendingId } object contains only one ID
   */
  const handleDelete = (id) => {
    // check if pressed button corresponds to gain item
    if (id?.gainId) {
      // modify local data in state
      const newData = filteredTransactions.filter(
        (f) => f.gainId !== id.gainId
      );
      const handleDataState = {
        func: setData,
        needDispatch: false,
        param: newData,
        itemName: "gain",
      };

      // modify data in store
      const handleDataStore = {
        func: deleteGainById,
        needDispatch: true,
        param: id.gainId,
        itemName: "gain",
      };

      setModalDataToHandle([handleDataState, handleDataStore]);
    }

    // check if pressed button corresponds to spending item
    if (id?.spendingId) {
      // modify local data in state
      const newData = filteredTransactions.filter(
        (f) => f.spendingId !== id?.spendingId
      );
      const handleDataState = {
        func: setData,
        needDispatch: false,
        param: newData,
        itemName: "spending",
      };

      // modify data in store
      const handleDataStore = {
        func: deleteSpendingById,
        needDispatch: true,
        param: id.spendingId,
        itemName: "spending",
      };
      setModalDataToHandle([handleDataState, handleDataStore]);
    }
  };

  const handleFilter = (filterIndex) => {
    setFilterOptionsIndex(filterIndex);
  };

  return (
    <>
      <div className="d-flex mb-2">
        <div className="align-self-center flex-grow-1">
          <h4>Transaction history</h4>
        </div>
        <div className="dropdown">
          <button
            className="btn dropdown-toggle p-2 border mx-1"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filter <i className="bi bi-filter"></i>
          </button>
          <ul
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton1"
          >
            {filterOptions.map((f, index) => (
              <li key={index}>
                <div
                  onClick={() => handleFilter(index)}
                  className={
                    index === filterOptionsIndex
                      ? "dropdown-item active"
                      : "dropdown-item"
                  }
                >
                  {f.text}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="p-2 btn border mx-1"
          disabled
          type="button"
        >
          Add transaction <i className="bi bi-plus-circle-fill"></i>
        </button>
      </div>
      {isLoading ? (
        <SpinLoading />
      ) : (
        transactionsCrop &&
        transactionsCrop.length > 0 && (
          <div className="d-flex flex-column">
            {modalConfirmationForm}
            <TransactionHistoryList
              data={transactionsCrop}
              onDelete={handleDelete}
              modalNameId={modalNameForId}
            />
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

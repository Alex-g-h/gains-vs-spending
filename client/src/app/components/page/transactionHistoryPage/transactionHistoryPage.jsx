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
import Pagination from "../../common/pagination";
import SpinLoading from "../../ui/spinLoading";
import HistoryDataItem from "./historyDataItem";
import TransactionHistoryList from "./transactionHistoryList";
import orderByLodash from "lodash/orderBy";
import { useNavigate } from "react-router-dom";
import usePaginate from "../../../hooks/usePaginate";
import DropdownFilter from "./dropdownFilter";

const TransactionHistoryPage = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const gains = useSelector(getGains(currentUserId));
  const gainsLoadingStatus = useSelector(getGainsLoadingStatus());
  const spending = useSelector(getSpendings(currentUserId));
  const spendingLoadingStatus = useSelector(getSpendingLoadingStatus());

  const [filter, setFilter] = useState({ orderBy: "date", dir: "asc" });

  const pageSize = 3;
  const [data, setData] = useState([]);

  const modalNameForId = "History";
  const { modalConfirmationForm, setModalDataToHandle } =
    useModalDelete(modalNameForId);

  const navigate = useNavigate();

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

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  const filteredTransactions = orderByLodash(data, filter.orderBy, filter.dir);

  const count = filteredTransactions ? filteredTransactions.length : 0;

  const {
    handlePageChange,
    itemsCrop: transactionsCrop,
    currentPageNumber,
  } = usePaginate(filteredTransactions, count, pageSize);

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

  return (
    <>
      <div className="d-flex mb-2">
        <div className="align-self-center flex-grow-1">
          <h4>Transaction history</h4>
        </div>
        <DropdownFilter handleFilter={handleFilter} />
        <div className="dropdown">
          <button
            className="btn p-2 border mx-1"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Add transaction <i className="bi bi-plus-circle-fill"></i>
          </button>
          <ul
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <div
                onClick={() => navigate("/gain/add")}
                className="dropdown-item"
              >
                Gains
              </div>
            </li>
            <li>
              <div
                onClick={() => navigate("/spending/add")}
                className="dropdown-item"
              >
                Spending
              </div>
            </li>
          </ul>
        </div>
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

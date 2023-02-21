import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUserId } from "../../../store/user";
import WithEditDelete from "../hoc/withEditDelete";
import SpinLoading from "../spinLoading";
import {
  deleteSpendingById,
  getSpendingLoadingStatus,
  getSpendings,
} from "../../../store/spending";
import SpendingRow from "./spendingRow";
import { getExpenseTypesLoadingStatus } from "../../../store/expenseTypes";

const SpendingList = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const spending = useSelector(getSpendings(currentUserId));
  const spendingLoadingStatus = useSelector(getSpendingLoadingStatus());
  const expenseTypesLoadingStatus = useSelector(getExpenseTypesLoadingStatus());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = spendingLoadingStatus || expenseTypesLoadingStatus;

  if (isLoading) return <SpinLoading />;

  const handleEdit = (id) => {
    navigate(`/spending/${id}/edit`);
  };

  const handleDelete = (id) => {
    // TODO: add modal confirmation window
    dispatch(deleteSpendingById(id));
  };

  return (
    <div>
      {spending?.map((s) => (
        <WithEditDelete
          key={s._id}
          id={s._id}
          onEdit={handleEdit}
          onDelete={handleDelete}
        >
          {/* {(expenseId, amount, date, accountId)} */}
          <SpendingRow
            accountId={s.account_id}
            expenseId={s.expense_id}
            date={s.date}
            amount={s.amount}
          />
        </WithEditDelete>
      ))}
    </div>
  );
};

export default SpendingList;

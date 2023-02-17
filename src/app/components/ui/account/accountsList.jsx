import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteAccount,
  getAccountLoadingStatus,
  getAccounts,
} from "../../../store/account";
import { getPaymentLoadingStatus } from "../../../store/payment";
import { getCurrentUserId } from "../../../store/user";
import WithEditDelete from "../hoc/withEditDelete";
import SpinLoading from "../spinLoading";
import Account from "./account";

const AccountsList = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const accounts = useSelector(getAccounts(currentUserId));
  const accountLoadingStatus = useSelector(getAccountLoadingStatus());
  const paymentsLoadingStatus = useSelector(getPaymentLoadingStatus());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = accountLoadingStatus || paymentsLoadingStatus;

  if (isLoading) return <SpinLoading />;

  const handleEdit = (id) => {
    navigate(`/account/${id}/edit`);
  };

  const handleDelete = (id) => {
    // TODO: add modal confirmation window
    dispatch(deleteAccount(id));
  };

  return (
    <div>
      {accounts.map((a) => (
        <WithEditDelete
          key={a._id}
          id={a._id}
          onEdit={handleEdit}
          onDelete={handleDelete}
        >
          <Account
            paymentId={a.payment_id}
            number={a.number}
            bankName={a.bank}
          />
        </WithEditDelete>
      ))}
    </div>
  );
};

export default AccountsList;

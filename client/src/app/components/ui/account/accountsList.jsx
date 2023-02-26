import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useModalDelete from "../../../hooks/useModalDelete";
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
  const navigate = useNavigate();

  const modalNameForId = "Accounts";
  const { modalConfirmationForm, setModalDataToHandle } =
    useModalDelete(modalNameForId);

  const isLoading = accountLoadingStatus || paymentsLoadingStatus;

  if (isLoading) return <SpinLoading />;

  const handleEdit = (id) => {
    navigate(`/account/${id}/edit`);
  };

  const handleDelete = (id) => {
    const data = {
      func: deleteAccount,
      needDispatch: true,
      param: id,
      itemName: "account",
    };
    setModalDataToHandle(data);
  };

  console.log("accounts", accounts);

  return (
    <div className="list-block">
      {modalConfirmationForm}
      {accounts?.map((a) => (
        <WithEditDelete
          key={a._id}
          id={a._id}
          onEdit={handleEdit}
          onDelete={handleDelete}
          modalNameId={modalNameForId}
        >
          <Account
            paymentId={a.paymentId}
            number={a.number}
            bankName={a.bank}
          />
        </WithEditDelete>
      ))}
    </div>
  );
};

export default AccountsList;

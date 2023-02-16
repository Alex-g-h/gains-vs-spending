import React from "react";
import { useSelector } from "react-redux";
import { getAccountLoadingStatus, getAccounts } from "../../../store/account";
import { getPaymentLoadingStatus } from "../../../store/payment";
import { getCurrentUserId } from "../../../store/user";
import SpinLoading from "../spinLoading";
import Account from "./account";

const AccountsList = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const accounts = useSelector(getAccounts(currentUserId));
  const accountLoadingStatus = useSelector(getAccountLoadingStatus());
  const paymentsLoadingStatus = useSelector(getPaymentLoadingStatus());

  const isLoading = accountLoadingStatus || paymentsLoadingStatus;

  if (isLoading) return <SpinLoading />;

  return (
    <div>
      {accounts.map((a) => (
        <Account
          key={a._id}
          paymentId={a.payment_id}
          number={a.number}
          bankName={a.bank}
        />
      ))}
    </div>
  );
};

export default AccountsList;

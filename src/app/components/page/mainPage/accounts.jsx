import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPaymentLoadingStatus,
  getPayments,
  loadPayments,
} from "../../../store/payment";
import CaptionWithAdd from "../../common/captionWithAdd";

const Accounts = () => {
  const payments = useSelector(getPayments());
  const paymentsLoading = useSelector(getPaymentLoadingStatus());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPayments());
  }, []);

  if (paymentsLoading) return "Loading...";

  console.log("payments", payments);

  const handleAdd = () => {
    console.log("Accounts add");
  };

  return (
    <div className="border rounded">
      <CaptionWithAdd
        caption="Accounts"
        handleAdd={handleAdd}
      />
      <p>Content table</p>
    </div>
  );
};

export default Accounts;

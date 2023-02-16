import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPaymentLoadingStatus, getPayments } from "../../../store/payment";
import CaptionWithAdd from "../../common/captionWithAdd";
import SpinLoading from "../../ui/spinLoading";

const Accounts = () => {
  const payments = useSelector(getPayments());
  const paymentsLoading = useSelector(getPaymentLoadingStatus());
  const navigate = useNavigate();

  console.log("payments", payments);

  const handleAdd = () => {
    navigate("/addAccount");
  };

  const isLoading = paymentsLoading;

  return (
    <div className="border rounded p-1">
      {isLoading ? (
        <SpinLoading />
      ) : (
        <>
          <CaptionWithAdd
            caption="Accounts"
            handleAdd={handleAdd}
          />
          <p>Content table</p>
        </>
      )}
    </div>
  );
};

export default Accounts;

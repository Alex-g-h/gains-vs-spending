import React from "react";
import { useSelector } from "react-redux";
import { getPaymentById } from "../../store/payment";
import PropTypes from "prop-types";

const PaymentSystem = ({ paymentId }) => {
  const payment = useSelector(getPaymentById(paymentId));

  if (!payment) return "Choose...";

  return (
    <div className="d-flex m-1 align-items-center">
      <img
        className="me-2"
        src={payment?.image}
        alt="Payment logo"
        height="30px"
      />
      {payment?.name}
    </div>
  );
};

PaymentSystem.propTypes = {
  paymentId: PropTypes.string,
};

export default PaymentSystem;

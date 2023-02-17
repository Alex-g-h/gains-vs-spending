import React from "react";
import { useSelector } from "react-redux";
import { getPaymentById } from "../../../store/payment";
import PropTypes from "prop-types";

const Account = ({ paymentId, number, bankName }) => {
  const { image: paymentImageSrc } = useSelector(getPaymentById(paymentId));
  const secureNumber = "***" + number.substring(number.length - 4);

  return (
    <div className="d-flex align-items-center justify-content-between">
      <img
        className="ms-1"
        src={paymentImageSrc}
        alt="payment system"
        height="24"
      />
      <div className="mx-1 flex-grow-1">{bankName}</div>
      <div className="mx-1">
        <strong>{secureNumber}</strong>
      </div>
    </div>
  );
};

Account.propTypes = {
  paymentId: PropTypes.string,
  number: PropTypes.string,
  bankName: PropTypes.string,
};

export default Account;

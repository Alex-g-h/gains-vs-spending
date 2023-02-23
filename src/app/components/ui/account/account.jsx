import React from "react";
import { useSelector } from "react-redux";
import { getPaymentById } from "../../../store/payment";
import PropTypes from "prop-types";
import makeAccountNumberSecure from "../../../utils/makeAccountNumberSecure";

const Account = ({ paymentId, number, bankName }) => {
  const { image: paymentImageSrc } = useSelector(getPaymentById(paymentId));
  const secureNumber = makeAccountNumberSecure(number);

  return (
    <div className="d-flex align-items-center justify-content-between">
      <img
        className="ms-1"
        src={paymentImageSrc}
        alt="payment system"
        height="24"
      />
      <div className="mx-1 flex-grow-1 d-none d-md-block">{bankName}</div>
      <div className="mx-1">
        <div className="d-flex justify-content-center">
          <div className="d-none d-lg-block">
            <strong>{secureNumber.prefix}</strong>
          </div>
          <div>
            <strong>{secureNumber.lastDigits}</strong>
          </div>
        </div>
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

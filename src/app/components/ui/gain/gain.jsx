import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getAccountById } from "../../../store/account";
import makeAccountNumberSecure from "../../../utils/makeAccountNumberSecure";

const Gain = ({ amount, date, accountId }) => {
  const { number: accountNumber } = useSelector(getAccountById(accountId));
  const secureNumber = makeAccountNumberSecure(accountNumber);

  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="ms-1 fw-light">{date}</div>
      <div className="mx-1 flex-grow-1 ">{secureNumber}</div>
      <div className="mx-1">
        <strong>
          {amount} {"\u0024"}
        </strong>
      </div>
    </div>
  );
};

Gain.propTypes = {
  amount: PropTypes.number,
  date: PropTypes.string,
  accountId: PropTypes.string,
};

export default Gain;

import React from "react";
import { useSelector } from "react-redux";
import { getExpenseTypesById } from "../../../store/expenseTypes";
import PropTypes from "prop-types";
import makeAccountNumberSecure from "../../../utils/makeAccountNumberSecure";
import { getAccountById } from "../../../store/account";

const SpendingRow = ({ expenseId, amount, date, accountId }) => {
  const account = useSelector(getAccountById(accountId));
  const { image: expenseTypeImageSrc } = useSelector(
    getExpenseTypesById(expenseId)
  );

  if (!account) return "";

  const { number: accountNumber } = account;
  const secureNumber = makeAccountNumberSecure(accountNumber);

  return (
    <div className="d-flex align-items-center justify-content-between">
      <img
        className="ms-1"
        src={expenseTypeImageSrc}
        alt="expense type"
        height="50"
      />
      <div className="ms-1 fw-light d-none d-md-block">{date}</div>
      <div className="mx-1 flex-grow-1 d-flex justify-content-center">
        <div className="d-none d-lg-block">{secureNumber.prefix}</div>
        <div className="d-none d-lg-block">{secureNumber.lastDigits}</div>
      </div>
      <div className="mx-1">
        <strong>
          {amount} {"\u0024"}
        </strong>
      </div>
    </div>
  );
};

SpendingRow.propTypes = {
  expenseId: PropTypes.string,
  amount: PropTypes.number,
  date: PropTypes.string,
  accountId: PropTypes.string,
};

export default SpendingRow;

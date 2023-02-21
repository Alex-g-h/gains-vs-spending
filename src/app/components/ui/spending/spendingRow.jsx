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

  // TODO: adaptive design (remove account number, shorter secure account number)

  return (
    <div className="d-flex align-items-center justify-content-between">
      <img
        className="ms-1"
        src={expenseTypeImageSrc}
        alt="expense type"
        height="50"
      />
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

// <div className="d-flex align-items-center justify-content-between">
//   <img
//     className="ms-1"
//     src={paymentImageSrc}
//     alt="payment system"
//     height="24"
//   />
//   <div className="mx-1 flex-grow-1">{bankName}</div>
//   <div className="mx-1">
//     <strong>{secureNumber}</strong>
//   </div>
// </div>;

SpendingRow.propTypes = {
  expenseId: PropTypes.string,
  amount: PropTypes.number,
  date: PropTypes.string,
  accountId: PropTypes.string,
};

export default SpendingRow;

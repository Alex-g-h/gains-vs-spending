import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getAccountById } from "../../../store/account";
import { getPaymentById } from "../../../store/payment";
import { getExpenseTypesById } from "../../../store/expenseTypes";
import makeAccountNumberSecure from "../../../utils/makeAccountNumberSecure";
import WithEditDelete from "../../ui/hoc/withEditDelete";
import { useNavigate } from "react-router-dom";

const Transaction = ({
  accountId,
  gainId,
  spendingId,
  expenseId,
  date,
  amount,
  comment,
  onDelete,
  modalNameId,
}) => {
  const navigate = useNavigate();
  const account = useSelector(getAccountById(accountId));
  const payment = useSelector(getPaymentById(account?.paymentId));
  const paymentImageSrc = payment?.image;
  const accountNumber = account?.number;
  const secureNumber = makeAccountNumberSecure(accountNumber);

  const isGain = gainId;
  const classes = "fs-4 text-";
  const incomeOrOutcomeClass = isGain
    ? classes + "success"
    : classes + "danger";

  const expense = useSelector(getExpenseTypesById(expenseId));
  const expenseTypeImageSrc = expense?.image;
  const expenseName = expense?.name;

  // TODO: stay on the same page after edit transaction
  const handleEdit = (id) => {
    if (id?.gainId) navigate(`/gain/${id.gainId}/edit`);
    if (id?.spendingId) navigate(`/spending/${id.spendingId}/edit`);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center align-self-center ms-1">
            <img
              className="me-2"
              src={paymentImageSrc}
              alt="payment system"
              height="30"
            />
            <strong>{secureNumber.prefix + secureNumber.lastDigits}</strong>
          </div>
          <div className="fw-semibold">{date}</div>
        </div>
      </div>
      {isGain ? (
        ""
      ) : (
        <div>
          <div className="d-flex align-items-center ">
            <div className="d-flex flex-fill align-items-center">
              <img
                src={expenseTypeImageSrc}
                alt="expense type"
                height="70"
              />
              {expenseName}
            </div>
            <div className="me-3 align-self-center fst-italic">{comment}</div>
          </div>
        </div>
      )}
      <div className="card-footer">
        <WithEditDelete
          id={{ gainId, spendingId }}
          onEdit={handleEdit}
          onDelete={onDelete}
          modalNameId={modalNameId}
        >
          <div className="mx-1">
            <strong className={incomeOrOutcomeClass}>
              {amount} {"\u0024"}
            </strong>
          </div>
        </WithEditDelete>
      </div>
    </div>
  );
};

Transaction.propTypes = {
  accountId: PropTypes.string.isRequired,
  gainId: PropTypes.string,
  spendingId: PropTypes.string,
  expenseId: PropTypes.string,
  date: PropTypes.string,
  amount: PropTypes.string,
  comment: PropTypes.string,
  onDelete: PropTypes.func,
  modalNameId: PropTypes.string,
};

export default Transaction;

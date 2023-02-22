import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getAccountById } from "../../../store/account";
import { getPaymentById } from "../../../store/payment";
import { getExpenseTypesById } from "../../../store/expenseTypes";
import makeAccountNumberSecure from "../../../utils/makeAccountNumberSecure";
import WithEditDelete from "../../ui/hoc/withEditDelete";
import { useNavigate } from "react-router-dom";
import { deleteGainById } from "../../../store/gain";
import { deleteSpendingById } from "../../../store/spending";

const Transaction = ({
  accountId,
  gainId,
  spendingId,
  expenseId,
  date,
  amount,
  comment,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const account = useSelector(getAccountById(accountId));
  const payment = useSelector(getPaymentById(account?.payment_id));
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

  // TODO: stay on the same page after edit
  const handleEdit = (id) => {
    if (id?.gainId) navigate(`/gain/${id.gainId}/edit`);
    if (id?.spendingId) navigate(`/spending/${id.spendingId}/edit`);
  };

  // TODO: stay on the same page after delete
  const handleDelete = (id) => {
    // TODO: add modal confirmation window
    if (id?.gainId) dispatch(deleteGainById(id.gainId));
    if (id?.spendingId) dispatch(deleteSpendingById(id.spendingId));
    navigate(0);
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
            <strong>{secureNumber}</strong>
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
          onDelete={handleDelete}
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
};

export default Transaction;

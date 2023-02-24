import React from "react";
import PropTypes from "prop-types";
import { getExpenseTypesById } from "../../../store/expenseTypes";
import { useSelector } from "react-redux";

const ExpenseType = ({ expenseTypeId }) => {
  const expenseType = useSelector(getExpenseTypesById(expenseTypeId));

  if (!expenseType) return "Choose...";

  return (
    <div className="d-flex m-1 align-items-center">
      <img
        className="me-2"
        src={expenseType?.image}
        alt="Expense type logo"
        height="30px"
      />
      {expenseType?.name}
    </div>
  );
};

ExpenseType.propTypes = {
  expenseTypeId: PropTypes.string,
};

export default ExpenseType;

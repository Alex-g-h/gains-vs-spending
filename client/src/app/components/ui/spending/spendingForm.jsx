import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "../../common/form/textField";
import TextAreaField from "../../common/form/textAreaField";
import { validator } from "../../../utils/validator";
import SpinLoading from "../spinLoading";
import SelectField from "../../common/form/selectField";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/user";
import { getAccountLoadingStatus, getAccounts } from "../../../store/account";
import SelectExpenseTypes from "../expenseTypes/selectExpenseTypes";
import {
  getExpenseTypes,
  getExpenseTypesById,
  getExpenseTypesLoadingStatus,
} from "../../../store/expenseTypes";
import {
  createSpending,
  getSpendingById,
  updateSpending,
} from "../../../store/spending";

const initialExpenseType = {
  value: "",
  image: "",
  label: "",
};

const SpendingForm = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    date: "",
    account: "",
    amount: "",
    expenseType: initialExpenseType,
    comment: "",
  });

  const { spendingId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserId = useSelector(getCurrentUserId());
  const accounts = useSelector(getAccounts(currentUserId));
  const accountsLoading = useSelector(getAccountLoadingStatus());
  const [accountsConverted, setAccountsConverted] = useState([]);
  const [expenseTypesConverted, setExpenseTypesConverted] = useState([]);
  const expenseTypes = useSelector(getExpenseTypes());
  const expenseTypesLoading = useSelector(getExpenseTypesLoadingStatus());
  const currentSpending = useSelector(getSpendingById(spendingId));
  const expenseTypeObj = useSelector(
    getExpenseTypesById(currentSpending?.expenseId)
  );

  const isAddForm = !spendingId; // otherwise it's the edit form

  // redirect to add new spending page if current page is "edit" and
  // spendingId is wrong (not exists)
  if (!isAddForm && !currentSpending) navigate("/spending/add");

  const handleChange = (target) => {
    setData((prevData) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    date: {
      isRequired: { message: "Date is required" },
    },
    account: {
      isRequired: { message: "Account is required" },
    },
    amount: {
      isRequired: { message: "Amount is required" },
      isPositiveDigit: {
        message: "Amount must be positive value",
      },
    },
    expenseType: {
      isRequired: { message: "Expense type is required" },
    },
  };

  useEffect(() => {
    setAccountsConverted(convertAccounts(accounts));
  }, [accountsLoading]);

  useEffect(() => {
    setExpenseTypesConverted(convertExpenseTypes(expenseTypes));
  }, [expenseTypesLoading]);

  // initialize data for edit form
  useEffect(() => {
    if (currentSpending) {
      const { date, amount, accountId, comment } = currentSpending;
      const amountString = String(amount);
      const newData = {
        date,
        amount: amountString,
        account: accountId,
        comment,
      };

      if (expenseTypeObj) {
        const expenseConverted = convertExpenseTypes([expenseTypeObj]).at(0);
        newData.expenseType = expenseConverted;
      }

      setData(newData);
    }
  }, [expenseTypeObj]);

  useEffect(() => {
    validate();
  }, [data]);

  function convertAccounts(accounts) {
    return accounts?.map((account) => ({
      value: account._id,
      label: String(account.number),
    }));
  }

  function convertExpenseTypes(exps) {
    return exps?.map((exp) => ({
      value: exp._id,
      label: exp.name,
      image: exp.image,
    }));
  }

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;
  const isActiveButton = isValid && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    // validation
    const isValid = validate();
    if (!isValid) return;

    setLoading(true);

    const { account, date, amount, expenseType, comment } = data;
    const amountNumber = Number(amount);

    if (isAddForm) {
      dispatch(
        createSpending({
          userId: currentUserId,
          accountId: account,
          expenseId: expenseType.value,
          amount: amountNumber,
          date,
          comment,
        })
      )
        .unwrap()
        .then(() => navigate(-1))
        .finally(() => setLoading(false));
    } else {
      const editSpending = {
        ...currentSpending,
        accountId: account,
        expenseId: expenseType.value,
        amount: amountNumber,
        date,
        comment,
      };
      dispatch(updateSpending(editSpending))
        .unwrap()
        .then(() => navigate(-1))
        .finally(() => setLoading(false));
    }
  };

  if (accountsLoading) return <SpinLoading />;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Date"
          type="date"
          name="date"
          value={data.date}
          onChange={handleChange}
          error={errors.date}
        />
        <SelectField
          label="Account"
          name="account"
          defaultOption="Choose..."
          options={accountsConverted}
          onChange={handleChange}
          value={data.account}
          error={errors.account}
        />
        <TextField
          label="Amount, $"
          type="number"
          name="amount"
          value={data.amount}
          onChange={handleChange}
          error={errors.amount}
        />
        <SelectExpenseTypes
          label="Expense type"
          name="expenseType"
          options={expenseTypesConverted}
          onChange={handleChange}
          value={data.expenseType}
          error={errors.expenseType}
        />
        <TextAreaField
          label="Comment"
          name="comment"
          onChange={handleChange}
          value={data.comment}
          error={errors.comment}
        />
        {!loading ? (
          <button
            type="submit"
            disabled={!isActiveButton}
            className="btn btn-primary w-100 mx-auto"
          >
            {isAddForm ? "Add " : "Edit "} spending
          </button>
        ) : (
          <SpinLoading />
        )}
      </form>
    </>
  );
};

export default SpendingForm;

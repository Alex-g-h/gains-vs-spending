import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import SpinLoading from "../spinLoading";
import SelectField from "../../common/form/selectField";
import { useDispatch, useSelector } from "react-redux";
import { createGain, getGainById, updateGain } from "../../../store/gain";
import { getCurrentUserId } from "../../../store/user";
import { getAccountLoadingStatus, getAccounts } from "../../../store/account";

const GainForm = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    date: "",
    account: "",
    amount: "",
  });

  const { gainId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserId = useSelector(getCurrentUserId());
  const accounts = useSelector(getAccounts(currentUserId));
  const accountsLoading = useSelector(getAccountLoadingStatus());
  const [accountsConverted, setAccountsConverted] = useState([]);
  const currentGain = useSelector(getGainById(gainId));

  const isAddForm = !gainId; // otherwise it's the edit form

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
  };

  useEffect(() => {
    setAccountsConverted(convertAccounts(accounts));
  }, [accountsLoading]);

  // initialize data for edit form
  useEffect(() => {
    if (currentGain) {
      const { date, amount, account_id: accountId } = currentGain;
      const amountString = String(amount);
      const newData = {
        date,
        amount: amountString,
        account: accountId,
      };

      setData(newData);
    }
  }, [currentGain]);

  useEffect(() => {
    validate();
  }, [data]);

  function convertAccounts(accounts) {
    return accounts?.map((account) => ({
      value: account._id,
      label: String(account.number),
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

    const { account, date, amount } = data;
    const amountNumber = Number(amount);

    if (isAddForm) {
      dispatch(
        createGain({
          userId: currentUserId,
          accountId: account,
          date,
          amount: amountNumber,
        })
      )
        .unwrap()
        .then(() => navigate(-1))
        .finally(() => setLoading(false));
    } else {
      const editGain = {
        ...currentGain,
        account_id: account,
        date,
        amount: amountNumber,
      };
      dispatch(updateGain(editGain))
        .unwrap()
        .then(() => navigate(-1))
        .finally(() => setLoading(false));
    }
  };

  if (accountsLoading) return <SpinLoading />;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
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
            {!loading ? (
              <button
                type="submit"
                disabled={!isActiveButton}
                className="btn btn-primary w-100 mx-auto"
              >
                {isAddForm ? "Add " : "Edit "} gain
              </button>
            ) : (
              <SpinLoading />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default GainForm;

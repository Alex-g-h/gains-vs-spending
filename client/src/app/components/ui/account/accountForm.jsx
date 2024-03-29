import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import SelectPayment from "../payment/selectPayment";
import { validator } from "../../../utils/validator";
import { useNavigate, useParams } from "react-router-dom";
import CheckBoxField from "../../common/form/checkBoxField";
import { useDispatch, useSelector } from "react-redux";
import SpinLoading from "../spinLoading";
import {
  getPaymentById,
  getPaymentLoadingStatus,
  getPayments,
} from "../../../store/payment";
import {
  createAccount,
  getAccountById,
  updateAccount,
} from "../../../store/account";
import { getCurrentUserId } from "../../../store/user";

// TODO: add bank card preview with data like real life view

const initialPayment = {
  value: "",
  image: "",
  label: "",
};

/**
 * Form with account data. Used both for edit existing account
 * and for add new account depending on URL path.
 * @returns Form with account data
 */
const AccountForm = () => {
  const [data, setData] = useState({
    bank: "",
    number: "",
    payment: initialPayment,
    credit: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const payments = useSelector(getPayments());
  const paymentsLoading = useSelector(getPaymentLoadingStatus());
  const [paymentsConverted, setPaymentsConverted] = useState([]);
  const currentUserId = useSelector(getCurrentUserId());

  const { accountId } = useParams();

  const currentAccount = useSelector(getAccountById(accountId));
  const paymentObj = useSelector(getPaymentById(currentAccount?.paymentId));

  const isAddForm = !accountId; // otherwise it's the edit form

  // redirect to add new account page if current page is "edit" and
  // accountId is wrong (not exists)
  if (!isAddForm && !currentAccount) navigate("/account/add");

  // initialize data for edit form
  useEffect(() => {
    if (currentAccount) {
      const { bank, number, credit } = currentAccount;
      const newData = {
        bank,
        number,
        payment: initialPayment,
        credit,
      };

      if (paymentObj) {
        const paymentConverted = convertPayments([paymentObj]).at(0);
        newData.payment = paymentConverted;
      }
      setData(newData);
    }
  }, [paymentObj]);

  useEffect(() => {
    setPaymentsConverted(convertPayments(payments));
  }, [paymentsLoading]);

  const handleChange = (target) => {
    setData((prevData) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    bank: {
      isRequired: { message: "Bank name is required" },
    },
    number: {
      isRequired: { message: "Card number is required" },
      min: {
        message: "Card number must be at least 12 digits",
        value: 12,
      },
      max: {
        message: "Card number must be at least 19 digits",
        value: 19,
      },
      isOnlyDigits: {
        message: "Card number must contains only digits",
      },
    },
    payment: {
      isRequired: { message: "Payment system is required" },
    },
  };

  function convertPayments(payments) {
    return payments?.map((payment) => ({
      value: payment._id,
      label: payment.name,
      image: payment.image,
    }));
  }

  useEffect(() => {
    validate();
  }, [data]);

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

    const { payment: paymentConverted, bank, number, credit } = data;

    if (isAddForm) {
      dispatch(
        createAccount({
          userId: currentUserId,
          paymentId: paymentConverted.value,
          bank,
          number,
          credit,
        })
      )
        .unwrap()
        .then(() => navigate(-1))
        .finally(() => setLoading(false));
    } else {
      const editAccount = {
        ...currentAccount,
        paymentId: paymentConverted.value,
        bank,
        number,
        credit,
      };
      dispatch(updateAccount(editAccount))
        .unwrap()
        .then(() => navigate(-1))
        .finally(() => setLoading(false));
    }
  };

  if (paymentsLoading) return <SpinLoading />;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Bank name"
          type="text"
          name="bank"
          value={data.bank}
          onChange={handleChange}
          error={errors.bank}
        />
        <TextField
          label="Number"
          type="number"
          name="number"
          value={data.number}
          onChange={handleChange}
          error={errors.number}
        />
        <SelectPayment
          label="Payment system"
          name="payment"
          options={paymentsConverted}
          onChange={handleChange}
          value={data.payment}
          error={errors.payment}
        />
        <CheckBoxField
          value={data.credit}
          onChange={handleChange}
          name="credit"
          error={errors.credit}
        >
          Credit card
        </CheckBoxField>
        {!loading ? (
          <button
            type="submit"
            disabled={!isActiveButton}
            className="btn btn-primary w-100 mx-auto"
          >
            {isAddForm ? "Add " : "Edit "} card
          </button>
        ) : (
          <SpinLoading />
        )}
      </form>
    </>
  );
};

export default AccountForm;

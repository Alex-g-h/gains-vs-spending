import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import RadioField from "../common/form/radioField";
import { validator } from "../../utils/validator";
import { useNavigate } from "react-router-dom";
import CheckBoxField from "../common/form/checkBoxField";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, signUp } from "../../store/user";
import SpinLoading from "./spinLoading";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    sex: "male",
    name: "",
    license: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signupError = useSelector(getAuthErrors());

  const handleChange = (target) => {
    setData((prevData) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "Email is required" },
      isEmail: { message: "Wrong email address" },
    },
    name: {
      isRequired: { message: "Name is required" },
      min: {
        message: "Name must be at least 3 symbols",
        value: 3,
      },
    },
    password: {
      isRequired: { message: "Password is required" },
      isCapitalSymbol: {
        message: "Password doesn't contain at least one capital letter",
      },
      isContainDigit: {
        message: "Password doesn't contain at least one digit",
      },
      min: {
        message: "Password must be at least 8 symbols",
        value: 8,
      },
    },
    license: {
      isRequired: {
        message:
          "Your couldn't use our service without confirmation of license agreement",
      },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  useEffect(() => {
    if (signupError) toast.error(signupError);
  }, [signupError]);

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

    dispatch(signUp(data))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        // type="email"
        type="text"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Name"
        // type="email"
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" },
        ]}
        value={data.sex}
        name="sex"
        label="Choose your sex"
        onChange={handleChange}
      />
      <CheckBoxField
        value={data.license}
        onChange={handleChange}
        name="license"
        error={errors.license}
      >
        Confirm the <a>license agreement</a>
      </CheckBoxField>
      {!loading ? (
        <button
          type="submit"
          disabled={!isActiveButton}
          className="btn btn-primary w-100 mx-auto"
        >
          Sign Up
        </button>
      ) : (
        <SpinLoading />
      )}
    </form>
  );
};

export default RegisterForm;

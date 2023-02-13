import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/user";
import SpinLoading from "./spinLoading";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleChange = (target) => {
    setData((prevData) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "Email is required" },
    },
    password: {
      isRequired: { message: "Password is required" },
    },
  };

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

    const redirect = location.state ? location.state.referrer?.pathname : "/";

    dispatch(signIn(data))
      .unwrap()
      .then(() => {
        navigate(redirect, { replace: true });
      })
      .catch(() => {
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
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField
        value={data.stayOn}
        onChange={handleChange}
        name="stayOn"
      >
        Keep on login
      </CheckBoxField>
      {!loading ? (
        <button
          type="submit"
          disabled={!isActiveButton}
          className="btn btn-primary w-100 mx-auto"
        >
          Log In
        </button>
      ) : (
        <SpinLoading />
      )}
    </form>
  );
};

export default LoginForm;

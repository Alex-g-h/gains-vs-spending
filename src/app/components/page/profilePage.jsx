import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUserData, updateUser } from "../../store/user";
import { validator } from "../../utils/validator";
import RadioField from "../common/form/radioField";
import TextField from "../common/form/textField";
import SpinLoading from "../ui/spinLoading";

const ProfilePage = () => {
  const user = useSelector(getCurrentUserData());
  const [data, setData] = useState(user);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  };

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (target) => {
    setData((prevData) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

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

    dispatch(updateUser(data))
      .unwrap()
      .then(() => {
        navigate(-1);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="text"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <TextField
              label="Name"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              error={errors.name}
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
            {!loading ? (
              <button
                type="submit"
                disabled={!isActiveButton}
                className="btn btn-primary w-100 mx-auto"
              >
                Update
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

export default ProfilePage;

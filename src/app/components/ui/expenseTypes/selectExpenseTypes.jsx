import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import ExpenseType from "./expenseType";

const SelectExpenseTypes = ({
  options,
  onChange,
  name,
  label,
  value,
  error,
}) => {
  const handleChange = (data) => {
    onChange({ name, value: { ...data } });
  };

  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : " is-valid");
  };

  return (
    <div className=" mb-4 ">
      <label>{label}</label>{" "}
      <div className="input-group has-validation">
        <Select
          className={getInputClasses()}
          maxMenuHeight={170}
          name={name}
          options={options}
          onChange={handleChange}
          value={value}
          getOptionLabel={(option) => (
            <ExpenseType expenseTypeId={option.value} />
          )}
        />
        <div className="invalid-feedback">{error}</div>
      </div>
    </div>
  );
};

SelectExpenseTypes.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  value: PropTypes.object,
  error: PropTypes.string,
};

export default SelectExpenseTypes;

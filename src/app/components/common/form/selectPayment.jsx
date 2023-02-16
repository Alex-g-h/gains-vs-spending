import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import PaymentSystem from "../../ui/paymentSystem";

const SelectPayment = ({ options, onChange, name, label, defaultValue }) => {
  const handleChange = ({ value }) => {
    onChange({ name, value });
  };

  return (
    <div className=" mb-4">
      <label>{label}</label>{" "}
      <Select
        defaultValue={defaultValue}
        name={name}
        options={options}
        onChange={handleChange}
        getOptionLabel={(option) => <PaymentSystem paymentId={option.value} />}
      />
    </div>
  );
};

SelectPayment.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  defaultValue: PropTypes.array,
};

export default SelectPayment;

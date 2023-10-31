import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CommonFormWrap = ({ children }) => {
  const navigate = useNavigate();

  if (!children) navigate(-1);

  return (
    <div className="container mt-5 common-block">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">{children}</div>
      </div>
    </div>
  );
};

CommonFormWrap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default CommonFormWrap;

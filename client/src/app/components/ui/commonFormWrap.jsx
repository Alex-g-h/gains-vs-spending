import React from "react";
import PropTypes from "prop-types";

const CommonFormWrap = ({ children }) => {
  return (
    <div className="container mt-5">
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
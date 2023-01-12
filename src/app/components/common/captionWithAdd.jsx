import React from "react";
import PropTypes from "prop-types";

const CaptionWithAdd = ({ caption, handleAdd }) => {
  return (
    <div className="d-flex align-items-center p-1">
      <div className="">
        <h5>{caption}</h5>
      </div>
      <div className="pb-1">
        <button
          className="btn"
          onClick={handleAdd}
        >
          <i className="bi bi-plus-square-fill"></i>
        </button>
      </div>
    </div>
  );
};

CaptionWithAdd.propTypes = {
  caption: PropTypes.string,
  handleAdd: PropTypes.func,
};

export default CaptionWithAdd;

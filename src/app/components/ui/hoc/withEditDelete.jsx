import React from "react";
import PropTypes from "prop-types";

const WithEditDelete = ({ children, id, onEdit, onDelete }) => {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="flex-grow-1">{children}</div>
      <div className="d-flex align-self-center ms-1">
        <button
          className="btn p-1"
          onClick={() => onEdit(id)}
        >
          <i className="bi bi-pencil-fill"></i>
        </button>
        <button
          className="btn p-1"
          onClick={() => onDelete(id)}
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </div>
    </div>
  );
};

WithEditDelete.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default WithEditDelete;

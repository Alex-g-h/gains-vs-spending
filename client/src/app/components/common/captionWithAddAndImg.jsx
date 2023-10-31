import React from "react";
import PropTypes from "prop-types";

const CaptionWithAddAndImg = ({ caption, handleAdd, imageSource }) => {
  return (
    <div className="d-flex align-items-center align-self-center common-card__header">
      {imageSource && (
        <div>
          <img
            src={imageSource}
            width="60px"
          />
        </div>
      )}
      <div className="flex-grow-1 ps-2 pt-2">
        <h5>{caption}</h5>
      </div>
      <div>
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

CaptionWithAddAndImg.propTypes = {
  caption: PropTypes.string,
  handleAdd: PropTypes.func,
  imageSource: PropTypes.string,
};

export default CaptionWithAddAndImg;

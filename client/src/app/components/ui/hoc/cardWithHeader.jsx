import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import CaptionWithAdd from "../../common/captionWithAdd";

const CardWithHeader = ({
  children,
  headerAddLink,
  headerCaption,
  divMargin = "mx-1",
}) => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate(headerAddLink);
  };

  const classes = " border rounded p-1 mb-2 ";

  return (
    <div className={classes + divMargin}>
      <CaptionWithAdd
        caption={headerCaption}
        handleAdd={handleAdd}
      />
      {children}
    </div>
  );
};

CardWithHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  headerAddLink: PropTypes.string,
  headerCaption: PropTypes.string,
  divMargin: PropTypes.string,
};

export default CardWithHeader;

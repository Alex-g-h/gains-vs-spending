import React from "react";
import { useNavigate } from "react-router-dom";
import CaptionWithAdd from "../../common/captionWithAdd";
import GainsList from "./gainsList";

const Gains = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/gain/add");
  };

  return (
    <div className="border rounded p-1">
      <CaptionWithAdd
        caption="Gains"
        handleAdd={handleAdd}
      />
      <GainsList />
    </div>
  );
};

export default Gains;

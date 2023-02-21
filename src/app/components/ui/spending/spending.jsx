import React from "react";
import { useNavigate } from "react-router-dom";
import CaptionWithAdd from "../../common/captionWithAdd";
import SpendingList from "./spendingList";

const Spending = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/spending/add");
  };

  return (
    <div className="border rounded p-1 mb-2">
      <CaptionWithAdd
        caption="Spending"
        handleAdd={handleAdd}
      />
      <SpendingList />
    </div>
  );
};

export default Spending;

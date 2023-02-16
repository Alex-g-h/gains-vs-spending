import React from "react";
import { useNavigate } from "react-router-dom";
import CaptionWithAdd from "../../common/captionWithAdd";
import AccountsList from "./accountsList";

const Accounts = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/addAccount");
  };

  return (
    <div className="border rounded p-1">
      <CaptionWithAdd
        caption="Accounts"
        handleAdd={handleAdd}
      />
      <AccountsList />
    </div>
  );
};

export default Accounts;

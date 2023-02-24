import React from "react";
import { useNavigate } from "react-router-dom";
import CaptionWithAdd from "../../common/captionWithAdd";
import AccountsList from "./accountsList";

const Accounts = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/account/add");
  };

  return (
    <div className="border rounded p-1 mb-2">
      <CaptionWithAdd
        caption="Accounts"
        handleAdd={handleAdd}
      />
      <AccountsList />
    </div>
  );
};

export default Accounts;

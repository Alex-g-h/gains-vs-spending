import React from "react";
import CaptionWithAdd from "../../common/captionWithAdd";

const Accounts = () => {
  const handleAdd = () => {
    console.log("Accounts add");
  };

  return (
    <div className="border rounded">
      <CaptionWithAdd
        caption="Accounts"
        handleAdd={handleAdd}
      />
      <p>Content table</p>
    </div>
  );
};

export default Accounts;

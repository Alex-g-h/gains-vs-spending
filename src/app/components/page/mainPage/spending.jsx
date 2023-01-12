import React from "react";
import CaptionWithAdd from "../../common/captionWithAdd";

const Spending = () => {
  const handleAdd = () => {
    console.log("Spending add");
  };

  return (
    <div className="border rounded">
      <CaptionWithAdd
        caption="Spending"
        handleAdd={handleAdd}
      />
      <p>Content table</p>
    </div>
  );
};

export default Spending;

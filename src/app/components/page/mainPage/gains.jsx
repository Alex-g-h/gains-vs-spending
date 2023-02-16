import React from "react";
import CaptionWithAdd from "../../common/captionWithAdd";

const Gains = () => {
  const handleAdd = () => {
    console.log("Gains add");
  };

  return (
    <div className="border rounded p-1">
      <CaptionWithAdd
        caption="Gains"
        handleAdd={handleAdd}
      />
      <p>Content table</p>
    </div>
  );
};

export default Gains;

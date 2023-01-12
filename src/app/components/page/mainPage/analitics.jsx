import React from "react";

const Analitics = () => {
  return (
    <div className="border rounded p-2 ">
      <div>
        <button className="border">Gains</button>
        <button className="border">Spending</button>
      </div>
      <hr />
      <div className="d-flex flex-wrap justify-content-evenly">
        <div>Round chart</div>
        <div>Chart</div>
        <div>Hist</div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <div className="text-muted small">Analitics</div>
      </div>
    </div>
  );
};

export default Analitics;
import React from "react";
import GainsChartNut from "./gainsChartNut";

const Analytics = () => {
  return (
    <div className="border rounded p-2 ">
      <div>
        <button className="border">Gains</button>
        <button className="border">Spending</button>
      </div>
      <hr />
      <div className="d-flex flex-wrap justify-content-evenly">
        <div>
          <GainsChartNut />
        </div>
        <div>Chart</div>
        <div>Hist</div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <div className="text-muted small">Analytics</div>
      </div>
    </div>
  );
};

export default Analytics;

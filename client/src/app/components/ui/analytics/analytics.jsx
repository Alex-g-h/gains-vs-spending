import React, { useState } from "react";
import GainsChartNut from "./gainsChartNut";
import SpendingChartNut from "./spendingChartNut";

const Analytics = () => {
  const [isGains, setIsGains] = useState(true);

  const getClassesGains = () =>
    isGains ? "btn btn-primary" : "btn btn-secondary";
  const getClassesSpending = () =>
    !isGains ? "btn btn-primary" : "btn btn-secondary";

  return (
    <div className="border rounded p-2 ">
      <div className="btn-group">
        <button
          className={getClassesGains()}
          onClick={() => setIsGains(true)}
        >
          Gains
        </button>
        <button
          className={getClassesSpending()}
          onClick={() => setIsGains(false)}
        >
          Spending
        </button>
      </div>
      <hr />
      <div className="d-flex flex-wrap justify-content-evenly">
        <div>{isGains ? <GainsChartNut /> : <SpendingChartNut />}</div>
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

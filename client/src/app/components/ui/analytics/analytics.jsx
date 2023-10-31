import React, { useState } from "react";
import GainsChartHist from "./chartHist/gainsChartHist";
import SpendingChartHist from "./chartHist/spendingChartHist";
import GainsChartLine from "./chartLine/gainsChartLine";
import SpendingChartLine from "./chartLine/spendingChartLine";
import GainsChartNut from "./chartNut/gainsChartNut";
import SpendingChartNut from "./chartNut/spendingChartNut";

const Analytics = () => {
  const [isGains, setIsGains] = useState(true);

  const getClassesGains = () =>
    isGains ? "btn btn-primary" : "btn btn-secondary";
  const getClassesSpending = () =>
    !isGains ? "btn btn-primary" : "btn btn-secondary";

  return (
    <div className="border rounded p-2 common-card">
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
      <hr className="m-2" />
      <div className="d-flex flex-wrap justify-content-evenly">
        <div>{isGains ? <GainsChartNut /> : <SpendingChartNut />}</div>
        <div>{isGains ? <GainsChartLine /> : <SpendingChartLine />}</div>
        <div>{isGains ? <GainsChartHist /> : <SpendingChartHist />}</div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <div className="text-muted small">Analytics</div>
      </div>
    </div>
  );
};

export default Analytics;

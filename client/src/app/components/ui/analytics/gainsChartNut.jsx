import React from "react";
import { useSelector } from "react-redux";
import { getGains, getGainsLoadingStatus } from "../../../store/gain";
import { getCurrentUserId } from "../../../store/user";
import SpinLoading from "../spinLoading";
import ChartNut from "./chartNut";

const GainsChartNut = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const gains = useSelector(getGains(currentUserId));
  const gainsLoading = useSelector(getGainsLoadingStatus());

  const isLoading = gainsLoading;

  if (isLoading) return <SpinLoading />;

  const accountsWithSum = {};
  const accumulateSumByAccountId = (accountId, amount) => {
    if (!accountsWithSum[accountId]) {
      accountsWithSum[accountId] = { sum: amount };
    } else {
      accountsWithSum[accountId].sum += amount;
    }
  };

  // accumulate sum by account
  gains.forEach((g) => accumulateSumByAccountId(g.accountId, g.amount));

  return <ChartNut accountsWithSum={accountsWithSum} />;
};

export default GainsChartNut;

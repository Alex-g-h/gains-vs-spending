import React from "react";
import { useSelector } from "react-redux";
import { getGains, getGainsLoadingStatus } from "../../../../store/gain";
import { getCurrentUserId } from "../../../../store/user";
import SpinLoading from "../../spinLoading";
import { accumulateSumByAccountId } from "./accumulateSumByAccountId";
import ChartNut from "./chartNut";

const GainsChartNut = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const gains = useSelector(getGains(currentUserId));
  const gainsLoading = useSelector(getGainsLoadingStatus());

  const isLoading = gainsLoading;

  if (isLoading) return <SpinLoading />;

  if (gains.length === 0) return "";

  const accountsWithSum = {};

  // accumulate sum by account
  gains.forEach((g) =>
    accumulateSumByAccountId(accountsWithSum, g.accountId, g.amount)
  );

  return <ChartNut accountsWithSum={accountsWithSum} />;
};

export default GainsChartNut;

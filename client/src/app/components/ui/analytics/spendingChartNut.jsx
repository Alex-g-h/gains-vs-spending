import React from "react";
import { useSelector } from "react-redux";
import {
  getSpendingLoadingStatus,
  getSpendings,
} from "../../../store/spending";
import { getCurrentUserId } from "../../../store/user";
import SpinLoading from "../spinLoading";
import { accumulateSumByAccountId } from "./accumulateSumByAccountId";
import ChartNut from "./chartNut";

const SpendingChartNut = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const spending = useSelector(getSpendings(currentUserId));
  const spendingLoading = useSelector(getSpendingLoadingStatus());

  const isLoading = spendingLoading;

  if (isLoading) return <SpinLoading />;

  const accountsWithSum = {};

  // accumulate sum by account
  spending.forEach((g) =>
    accumulateSumByAccountId(accountsWithSum, g.accountId, g.amount)
  );

  return <ChartNut accountsWithSum={accountsWithSum} />;
};

export default SpendingChartNut;

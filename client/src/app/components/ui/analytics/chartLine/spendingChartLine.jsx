import React from "react";
import ChartLine from "./chartLine";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../../../store/user";
import SpinLoading from "../../spinLoading";
import {
  getSpendingLoadingStatus,
  getSpendings,
} from "../../../../store/spending";

const SpendingChartLine = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const spending = useSelector(getSpendings(currentUserId));
  const spendingLoading = useSelector(getSpendingLoadingStatus());

  const isLoading = spendingLoading;

  if (isLoading) return <SpinLoading />;

  const amountWithDate = [];

  // collect data (amount + date)
  spending.forEach((g) => {
    amountWithDate.push({ date: g.date, amount: g.amount });
  });

  return <ChartLine amountWithDate={amountWithDate} />;
};

export default SpendingChartLine;

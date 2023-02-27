import React from "react";
import ChartHist from "./chartHist";
import { useSelector } from "react-redux";
import {
  getSpendingLoadingStatus,
  getSpendings,
} from "../../../../store/spending";
import { getCurrentUserId } from "../../../../store/user";
import SpinLoading from "../../spinLoading";

const SpendingChartHist = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const spending = useSelector(getSpendings(currentUserId));
  const spendingLoading = useSelector(getSpendingLoadingStatus());

  const isLoading = spendingLoading;

  if (isLoading) return <SpinLoading />;

  const sumByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  // accumulate sum by account
  spending.forEach((g) => {
    const date = new Date(g.date);
    sumByMonth[date.getMonth()] += g.amount;
  });

  return <ChartHist sumByMonth={sumByMonth} />;
};

export default SpendingChartHist;

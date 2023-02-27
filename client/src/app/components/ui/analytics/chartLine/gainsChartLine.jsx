import React from "react";
import ChartLine from "./chartLine";
import { useSelector } from "react-redux";
import { getGains, getGainsLoadingStatus } from "../../../../store/gain";
import { getCurrentUserId } from "../../../../store/user";
import SpinLoading from "../../spinLoading";

const GainsChartLine = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const gains = useSelector(getGains(currentUserId));
  const gainsLoading = useSelector(getGainsLoadingStatus());

  const isLoading = gainsLoading;

  if (isLoading) return <SpinLoading />;

  const amountWithDate = [];

  // collect data (amount + date)
  gains.forEach((g) => {
    amountWithDate.push({ date: g.date, amount: g.amount });
  });

  return <ChartLine amountWithDate={amountWithDate} />;
};

export default GainsChartLine;

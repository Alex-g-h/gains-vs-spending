import React from "react";
import ChartHist from "./chartHist";
import { useSelector } from "react-redux";
import { getGains, getGainsLoadingStatus } from "../../../../store/gain";
import { getCurrentUserId } from "../../../../store/user";
import SpinLoading from "../../spinLoading";

const GainsChartHist = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const gains = useSelector(getGains(currentUserId));
  const gainsLoading = useSelector(getGainsLoadingStatus());

  const isLoading = gainsLoading;

  if (isLoading) return <SpinLoading />;

  if (gains.length === 0) return "";

  const sumByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  // accumulate sum by account
  gains.forEach((g) => {
    const date = new Date(g.date);
    sumByMonth[date.getMonth()] += g.amount;
  });

  return <ChartHist sumByMonth={sumByMonth} />;
};

export default GainsChartHist;

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../../../store/user";
import {
  getAccountLoadingStatus,
  getAccounts,
} from "../../../../store/account";
import SpinLoading from "../../spinLoading";
import { getRandomBgBorderColorAlpha } from "../../../../utils/random";
import PropTypes from "prop-types";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartNut = ({ accountsWithSum }) => {
  const currentUserId = useSelector(getCurrentUserId());
  const accounts = useSelector(getAccounts(currentUserId));
  const accountsLoading = useSelector(getAccountLoadingStatus());

  const isLoading = accountsLoading;

  if (isLoading) return <SpinLoading />;

  // add account bank names
  Object.keys(accountsWithSum).forEach((a) => {
    const account = accounts.find((acc) => acc._id === a);
    accountsWithSum[a].text = account.bank;
  });

  // initialize labels, data, colors
  const dataLabels = [];
  const dataSum = [];
  const dataColorsBackground = [];
  const dataColorsBorder = [];

  // generate data for chart
  Object.keys(accountsWithSum).forEach((a) => {
    const item = accountsWithSum[a];
    dataLabels.push(item.text);
    dataSum.push(item.sum);
    const [colorBg, colorBorder] = getRandomBgBorderColorAlpha();
    dataColorsBackground.push(colorBg);
    dataColorsBorder.push(colorBorder);
  });

  const data = {
    labels: dataLabels,
    datasets: [
      {
        label: "$ by bank",
        data: dataSum,
        backgroundColor: dataColorsBackground,
        borderColor: dataColorsBorder,
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};

ChartNut.propTypes = {
  accountsWithSum: PropTypes.object,
};

export default ChartNut;

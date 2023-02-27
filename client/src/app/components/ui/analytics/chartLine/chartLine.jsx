import React from "react";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const ChartLine = ({ amountWithDate }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
    },
    maintainAspectRatio: false,
  };

  const labels = amountWithDate.map((item) => item.date);

  const data = {
    labels,
    datasets: [
      {
        label: "$",
        data: amountWithDate.map((item) => item.amount),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Line
      options={options}
      data={data}
    />
  );
};

ChartLine.propTypes = {
  amountWithDate: PropTypes.arrayOf(PropTypes.object),
};

export default ChartLine;

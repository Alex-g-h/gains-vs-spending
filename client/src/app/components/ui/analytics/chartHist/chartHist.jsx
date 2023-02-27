import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const ChartHist = ({ sumByMonth }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "right",
      },
    },
    maintainAspectRatio: false,
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "$",
        data: sumByMonth,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Bar
      options={options}
      data={data}
    />
  );
};

ChartHist.propTypes = {
  sumByMonth: PropTypes.arrayOf(PropTypes.number),
};

export default ChartHist;

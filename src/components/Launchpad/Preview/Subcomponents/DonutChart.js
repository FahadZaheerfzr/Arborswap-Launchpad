import React, { useContext, useState } from "react";
import Chart from "react-apexcharts";
import { ThemeContext } from "context/ThemeContext/ThemeProvider";

const labels = ["Presale", "Liquidity", "Unlocked"];

export default function DonutChart({ presale, liquidity, burned, locked, supply, sale }) {
  const { theme } = useContext(ThemeContext);

  const tokenomics = sale.tokenomics || [];

  const originalColors = ['#307856', '#585B79', '#F8CF6B'];
  const tokenomicsColors = tokenomics.map(item => item.color);
  const colors = [...originalColors, ...tokenomicsColors];

  const originalSeries = [
    presale / supply * 100,
    parseFloat((liquidity / supply * 100).toFixed(2)),
    parseFloat(((supply - liquidity - presale) / supply * 100).toFixed(2)),
  ];

  const mergedSeries = [...originalSeries, ...tokenomics.map(item => parseFloat(item.percentage))];
  const mergedLabels = [...labels, ...tokenomics.map(item => item.name)];

  const [series, setSeries] = useState(mergedSeries);

  const handleClick = (index) => {
    const updatedSeries = [...series];
    if (updatedSeries[index] === 0) {
      updatedSeries[index] = mergedSeries[index];
    } else {
      updatedSeries[index] = 0;
    }
    setSeries(updatedSeries);
  };

  const options = {
    colors: colors,
    labels: labels,
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: "14px",
              fontFamily: "Gilroy",
              fontWeight: 500,
              color: theme === "dark" ? "#fff" : "#464754",
            },
            value: {
              show: true,
              fontSize: "16px",
              fontFamily: "Gilroy",
              fontWeight: 700,
              color: theme === "dark" ? "#fff" : "#464754",
              offsetY: 2,
              formatter: function (val) {
                return val + "%";
              },
            },
          },
        },
      },
    },
    stroke: {
      width: 0,
    },
    fill: {
      colors: colors,
    },
    dataLabels: {
      enabled: false,
    },
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  };

  return (
    <div className="flex">
      <Chart options={options} series={series} type="donut" width="300" />
      <div className="ml-4">
        {mergedLabels.map((label, index) => (
          <div key={index} className="flex items-center mb-2">
            <div
              className="w-4 h-4 rounded-md mr-2 cursor-pointer"
              style={{
                backgroundColor: colors[index],
                opacity: series[index] === 0 ? 0.5 : 1,
              }}
              onClick={() => handleClick(index)}
            ></div>
            <span
              className={`font-gilroy font-semibold ${
                theme === 'dark' ? 'text-light-text' : 'text-dark-text'
              } ${series[index] === 0 ? 'line-through' : ''}`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

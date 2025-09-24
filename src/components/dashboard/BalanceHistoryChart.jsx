import React from "react";
import ReactApexChart from "react-apexcharts";

export default function BalanceHistoryChart({ data = [] }) {
  // Format incoming data to [timestamp, value] pairs
  const chartData = Array.isArray(data) && data.length > 0
    ? data.map(d => [
        new Date(d.x || d.timestamp).getTime(),
        d.y || d.value,
      ])
    : [[Date.now(), 0]]; // fallback point if data is empty

  const series = [
    {
      name: "Balance",
      data: chartData,
    },
  ];

  const options = {
    chart: {
      type: "line",
      height: 100,
      sparkline: { enabled: true },
      toolbar: { show: false },
      background: "transparent",
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    markers: {
      size: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
      },
    },
    xaxis: {
      type: "datetime",
      labels: { show: false },
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      enabled: true,
      x: { format: "HH:mm" },
      style: { fontSize: "14px" },
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        const value = series[seriesIndex][dataPointIndex];
        return `<div style='background: #181a20; color: #8e740eff; font-weight: bold; padding: 6px 12px; border-radius: 8px;'>$${value}</div>`;
      },
    },
    colors: ["#f3bb37ff"],
    grid: {
      show: false,
    },
  };

  return (
    <div className="w-full h-16">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={64}
      />
    </div>
  );
}

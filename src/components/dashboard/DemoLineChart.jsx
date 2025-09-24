import React from "react";
import ReactApexChart from "react-apexcharts";

export default function BalanceHistoryChart() {
  // Generate 24 hourly data points with sine wave + noise
  const now = new Date();
  const fakeData = Array.from({ length: 24 }, (_, i) => {
    const d = new Date(now);
    d.setHours(i, 0, 0, 0);
    const y = 500 + 100 * Math.sin(i / 3) + Math.random() * 40;
    return [d.getTime(), Math.round(y)];
  });

  const series = [
    {
      name: "Balance",
      data: fakeData,
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
    stroke: { curve: "smooth", width: 4 },
    markers: { size: 0 },
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
    yaxis: { show: false },
    tooltip: {
      enabled: true,
      x: { format: "HH:mm" },
      style: { fontSize: "14px" },
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        const value = series[seriesIndex][dataPointIndex];
        return `<div style='background: #181a20; color: #ffe066; font-weight: bold; padding: 6px 12px; border-radius: 8px;'>$${value}</div>`;
      },
    },
    colors: ["#22c55e"],
    grid: { show: false },
  };

  return (
    <div className="w-full h-16">
      <ReactApexChart options={options} series={series} type="line" height={64} />
    </div>
  );
}

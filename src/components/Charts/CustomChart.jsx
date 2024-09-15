import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { FaMaximize, FaMinimize } from "react-icons/fa6";

const CustomChart = ({
  chartInnerTitle,
  chartLabel,
  chartData,
  chartTitle,
  chartDataColor,
}) => {
  const chartRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(true);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const data = {
      labels: chartLabel,
      datasets: [
        {
          label: chartInnerTitle,
          data: chartData,
          borderColor: "#172554",
          backgroundColor: chartDataColor,
        },
      ],
    };

    const config = {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };

    const newChartInstance = new Chart(ctx, config);
    setChartInstance(newChartInstance);
    return () => {
      newChartInstance.destroy();
    };
  }, [chartLabel, chartData, isMaximized]);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (chartInstance) {
      chartInstance.resize();
    }
  };

  return (
    <div
      style={{
        position: "relative",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        width: isMaximized ? "100%" : "auto",
        marginBottom: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: ".5rem",
        }}
      >
        {chartTitle}
        <div>
          <button onClick={handleMaximize} style={{ marginRight: "5px" }}>
            {isMaximized ? <FaMinimize /> : <FaMaximize />}
          </button>
        </div>
      </div>
      <div
        style={{
          height: isMaximized ? "50vh" : "0px",
          transition: "height 1s ease-in-out",
          overflow: "hidden",
        }}
      >
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default CustomChart;

import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const PeopleCountPieChart = () => {
  const { dashboard } = useSelector((state) => state.dashboard);

  const chartData = {
    labels: ["Customers", "Suppliers"],
    datasets: [
      {
        data: [dashboard.customerCount || 0, dashboard.supplierCount || 0],
        backgroundColor: ["rgba(54, 162, 235, 0.8)", "rgba(255, 99, 132, 0.8)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  const totalPeople = (dashboard.customerCount || 0) + (dashboard.supplierCount || 0);

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        component="h6"
        sx={{
          fontWeight: "bold",
          color: "var(--primary-color)",
        }}
      >
        People Distribution
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
        <Typography sx={{ fontWeight: "bold", color: "var(--primary-color)" }}>
          Total: {totalPeople}
        </Typography>
      </Box>

      <Box sx={{ height: "250px", width: "100%", mb: 2 }}>
        <Pie data={chartData} options={chartOptions} />
      </Box>
    </Paper>
  );
};

export default PeopleCountPieChart;

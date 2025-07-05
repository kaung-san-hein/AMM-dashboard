import React, { useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getMostSaleProducts } from "../../store/actions/customerInvoice";
import CircularProgress from "@mui/material/CircularProgress";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MostSaleProductsChart = () => {
  const { loading, mostSaleProducts } = useSelector(
    (state) => state.customerInvoice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMostSaleProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const chartData = {
    labels: mostSaleProducts.map((item) => item?.category?.name || "Unknown"),
    datasets: [
      {
        label: "Total Sales",
        data: mostSaleProducts.map((item) => item?.totalSold || 0),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Most Sale Products by Category",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Sales",
        },
      },
      x: {
        title: {
          display: true,
          text: "Category",
        },
      },
    },
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        height: "400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        component="h6"
        sx={{
          fontWeight: "bold",
          color: "var(--primary-color)",
          mb: 2,
        }}
      >
        Most Sale Products
      </Typography>
      <Box sx={{ flexGrow: 1, position: "relative" }}>
        <Bar data={chartData} options={options} />
      </Box>
    </Paper>
  );
};

export default MostSaleProductsChart; 
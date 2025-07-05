import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
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
import { getSupplierInvoiceReport } from "../../store/actions/supplierInvoice";
import CircularProgress from "@mui/material/CircularProgress";
import { formatNumberWithCommas } from "../../utils/formatNumberWithCommas";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SupplierInvoiceReportChart = () => {
  const { loading, supplierInvoiceReport } = useSelector(
    (state) => state.supplierInvoice
  );
  const dispatch = useDispatch();
  const [reportType, setReportType] = useState("monthly");

  useEffect(() => {
    dispatch(getSupplierInvoiceReport());
  }, [dispatch]);

  const handleReportTypeChange = (event, newReportType) => {
    if (newReportType !== null) {
      setReportType(newReportType);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const getChartData = () => {
    const reportData = supplierInvoiceReport[reportType];
    
    if (!reportData) {
      return {
        labels: [],
        datasets: [
          {
            label: "Purchase Amount",
            data: [],
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      };
    }

    return {
      labels: reportData.labels || [],
      datasets: [
        {
          label: "Purchase Amount (MMK)",
          data: reportData.data || [],
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };
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
        text: `Supplier Invoice Report - ${reportType.charAt(0).toUpperCase() + reportType.slice(1)}`,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Purchase: ${formatNumberWithCommas(context.parsed.y)} MMK`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Purchase Amount (MMK)",
        },
        ticks: {
          callback: function(value) {
            return formatNumberWithCommas(value);
          }
        }
      },
      x: {
        title: {
          display: true,
          text: reportType === "monthly" ? "Month" : "Year",
        },
      },
    },
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        height: "500px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography
          variant="h6"
          component="h6"
          sx={{
            fontWeight: "bold",
            color: "var(--primary-color)",
          }}
        >
          Supplier Invoice Report
        </Typography>
        <ToggleButtonGroup
          value={reportType}
          exclusive
          onChange={handleReportTypeChange}
          aria-label="report type"
          size="small"
        >
          <ToggleButton value="monthly" aria-label="monthly">
            Monthly
          </ToggleButton>
          <ToggleButton value="yearly" aria-label="yearly">
            Yearly
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ flexGrow: 1, position: "relative" }}>
        <Bar data={getChartData()} options={options} />
      </Box>
    </Paper>
  );
};

export default SupplierInvoiceReportChart;

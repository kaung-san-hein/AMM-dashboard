import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
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

const MostSaleProductsChart = ({ size = "large" }) => {
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

  return (
    <>
      {mostSaleProducts.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: size === "large" ? 3 : 2,
          }}
        >
          {mostSaleProducts.map((item, index) => (
            <Box
              key={index}
              sx={{
                p: size === "large" ? 2 : 1.5,
                bgcolor: "white",
                borderRadius: 1,
                border: "1px solid #e0e0e0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mb: 0.5 }}
              >
                {item?.monthName} {item?.year}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold", mb: 0.5 }}>
                {item?.product?.category?.name}
              </Typography>
              <Typography variant="body2" color="primary">
                Qty: {item?.quantity?.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="secondary">
                Amount: {item?.totalAmount?.toLocaleString()} Ks
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              color: "text.secondary",
              fontWeight: "medium",
            }}
          >
            📊 No Sales Data Available
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            There are currently no sales records to display.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sales data will appear here once you start making transactions.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default MostSaleProductsChart;

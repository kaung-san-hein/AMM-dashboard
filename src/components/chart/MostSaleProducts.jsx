import React, { useEffect } from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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

const MostSaleProducts = ({ size = "large" }) => {
  const { loading, mostSaleProducts } = useSelector(
    (state) => state.customerInvoice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMostSaleProducts());
  }, [dispatch]);

  // Group data by month
  const groupByMonth = (data) => {
    const grouped = {};
    data.forEach(item => {
      const monthKey = `${item.monthName} ${item.year}`;
      if (!grouped[monthKey]) {
        grouped[monthKey] = {
          monthName: item.monthName,
          year: item.year,
          month: item.month,
          categories: []
        };
      }
      grouped[monthKey].categories.push({
        categoryName: item.category.name,
        quantity: item.quantity,
        totalAmount: item.totalAmount
      });
    });
    
    // Sort categories by quantity (descending) for each month
    Object.values(grouped).forEach(monthData => {
      monthData.categories.sort((a, b) => b.quantity - a.quantity);
    });
    
    return Object.values(grouped).sort((a, b) => {
      // Sort by year and month (descending - most recent first)
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
  };

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

  const monthlyData = groupByMonth(mostSaleProducts);

  return (
    <>
      {monthlyData.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {monthlyData.map((monthData, monthIndex) => (
            <Paper
              key={monthIndex}
              elevation={1}
              sx={{
                p: size === "large" ? 3 : 2,
                borderRadius: 2,
                border: "1px solid #e0e0e0",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                  color: "primary.main",
                  borderBottom: "2px solid #e0e0e0",
                  pb: 1,
                }}
              >
                {monthData.monthName} {monthData.year}
              </Typography>
              
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                      <TableCell align="right" sx={{ fontWeight: "bold" }}>Quantity</TableCell>
                      <TableCell align="right" sx={{ fontWeight: "bold" }}>Total Amount (Ks)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {monthData.categories.map((category, categoryIndex) => (
                      <TableRow
                        key={categoryIndex}
                        sx={{
                          '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        <TableCell sx={{ fontWeight: "medium" }}>
                          {category.categoryName}
                        </TableCell>
                        <TableCell align="right">
                          {category.quantity.toLocaleString()}
                        </TableCell>
                        <TableCell align="right">
                          {category.totalAmount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow sx={{ backgroundColor: "#e3f2fd", fontWeight: "bold" }}>
                      <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                      <TableCell align="right" sx={{ fontWeight: "bold" }}>
                        {monthData.categories.reduce((sum, cat) => sum + cat.quantity, 0).toLocaleString()}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: "bold" }}>
                        {monthData.categories.reduce((sum, cat) => sum + cat.totalAmount, 0).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
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

export default MostSaleProducts;

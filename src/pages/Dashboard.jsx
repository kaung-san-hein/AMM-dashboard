import { Box, Grid, Typography } from "@mui/material";
import DashboardCard from "../components/card/DashboardCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllTotal } from "../store/actions/dashboard";
import BackButton from "../components/backButton/BackButton";

const Dashboard = () => {
  const { dashboard } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTotal());
  }, [dispatch]);

  return (
    <Box>
      <BackButton />
      <Typography
        gutterBottom
        variant="h5"
        component="h5"
        sx={{
          fontWeight: "bold",
          color: "var(--primary-color)",
          marginTop: "10px",
        }}
      >
        Dashboard
      </Typography>
      <Box sx={{ flexGrow: 1, mb: 2 }}>
        <Grid
          container
          alignItems="center"
          spacing={2}
          justifyContent="flex-start"
        >
          <Grid item>
            <DashboardCard
              title="Total Customer Invoice"
              total={dashboard.customerInvoiceTotal}
              linkText="View Details"
              linkHref="/admin/customer-invoices"
            />
          </Grid>
          <Grid item>
            <DashboardCard
              title="Total Supplier Invoice"
              total={dashboard.supplierInvoiceTotal}
              linkText="View Details"
              linkHref="/admin/supplier-invoices"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;

import { Box, Grid, Typography } from "@mui/material";
import DashboardCard from "../components/card/DashboardCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllTotal } from "../store/actions/dashboard";
import BackButton from "../components/backButton/BackButton";
import { formatNumberWithCommas } from "../utils/formatNumberWithCommas";
import CustomerInvoiceReportChart from "../components/chart/CustomerInvoiceReportChart";
import SupplierInvoiceReportChart from "../components/chart/SupplierInvoiceReportChart";
import MostSaleProductsChart from "../components/chart/MostSaleProductsChart";
import PeopleCountPieChart from "../components/chart/PeopleCountPieChart";

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
              total={`${formatNumberWithCommas(
                dashboard.customerInvoiceTotal
              )} MMK`}
              linkText="View Details"
              linkHref="/admin/customer-invoices"
            />
          </Grid>
          <Grid item>
            <DashboardCard
              title="Total Supplier Invoice"
              total={`${formatNumberWithCommas(
                dashboard.supplierInvoiceTotal
              )} MMK`}
              linkText="View Details"
              linkHref="/admin/supplier-invoices"
            />
          </Grid>
          <Grid item>
            <DashboardCard
              title="Stock Alert"
              total={`${dashboard.stockAlert} (s)`}
              linkText="View Details"
              linkHref="/admin/stock-alert"
            />
          </Grid>
          <Grid item>
            <DashboardCard
              title="Best Sale Product"
              total={``}
              linkText="View Details"
              linkHref="/admin/best-sellers"
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <SupplierInvoiceReportChart />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomerInvoiceReportChart />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MostSaleProductsChart />
            </Grid>
            <Grid item xs={12} md={6}>
              <PeopleCountPieChart />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

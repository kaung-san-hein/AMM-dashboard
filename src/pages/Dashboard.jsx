import { Box, Grid } from "@mui/material";
import DashboardCard from "../components/card/DashboardCard";

const Dashboard = () => {
  return (
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
            total={152}
            linkText="View Details"
            linkHref="/admin/customer-invoices"
          />
        </Grid>
        <Grid item>
          <DashboardCard
            title="Total Supplier Invoice"
            total={152}
            linkText="View Details"
            linkHref="/admin/supplier-invoices"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

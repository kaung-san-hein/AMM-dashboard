import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BackButton from "../../components/backButton/BackButton";
import MostSaleProductsChart from "../../components/chart/MostSaleProductsChart";

const MostSaleProducts = () => {
  return (
    <>
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
          Best Sellers
        </Typography>
        <MostSaleProductsChart />
      </Box>
    </>
  );
};

export default MostSaleProducts;

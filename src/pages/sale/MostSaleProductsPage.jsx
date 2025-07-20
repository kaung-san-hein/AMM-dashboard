import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BackButton from "../../components/backButton/BackButton";
import MostSaleProducts from "../../components/chart/MostSaleProducts";

const MostSaleProductsPage = () => {
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
        <MostSaleProducts />
      </Box>
    </>
  );
};

export default MostSaleProductsPage;

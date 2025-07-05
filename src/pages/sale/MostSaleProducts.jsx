import React, { useEffect } from "react";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomTable, {
  StyledTableCell,
  StyledTableRow,
} from "../../components/table/CustomTable";
import BackButton from "../../components/backButton/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import CircularProgress from "@mui/material/CircularProgress";
import { convertIDFormatted } from "../../utils/convertIDFormatted";
import { getMostSaleProducts } from "../../store/actions/customerInvoice";

const MostSaleProducts = () => {
  const router = useLocation();

  const { loading, mostSaleProducts } = useSelector(
    (state) => state.customerInvoice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const query = queryString.parse(router.search);
    dispatch(getMostSaleProducts(query));
  }, [dispatch, router.search]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
        <CustomTable
          header={
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Total Sold</StyledTableCell>
            </TableRow>
          }
          body={mostSaleProducts.map((row) => (
            <StyledTableRow key={row?.category?.id}>
              <StyledTableCell component="th" scope="row">
                {convertIDFormatted(row?.category?.id, 3)}
              </StyledTableCell>
              <StyledTableCell>{row?.category?.name}</StyledTableCell>
              <StyledTableCell>{row?.totalSold}</StyledTableCell>
            </StyledTableRow>
          ))}
        />
      </Box>
    </>
  );
};

export default MostSaleProducts;

import React, { useEffect, useState } from "react";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CustomTable, {
  StyledTableCell,
  StyledTableRow,
} from "../../components/table/CustomTable";
import CustomPagination from "../../components/pagination/CustomPagination";
import BackButton from "../../components/backButton/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import CircularProgress from "@mui/material/CircularProgress";
import { getProducts } from "../../store/actions/product";
import { LIMIT, STOCK } from "../../utils/constant";
import ProductDetail from "./ProductDetail";
import { convertIDFormatted } from "../../utils/convertIDFormatted";

const StockAlert = () => {
  const router = useLocation();

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detail, setDetail] = useState(null);

  const { loading, products, total } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const query = queryString.parse(router.search);
    if (!("page" in query)) {
      query.page = 1;
    }
    query.limit = LIMIT;
    query.stock = STOCK;
    dispatch(getProducts(query));
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
          Stock Alert
        </Typography>
        <CustomTable
          header={
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Size</StyledTableCell>
              <StyledTableCell>Net Weight</StyledTableCell>
              <StyledTableCell>Kg</StyledTableCell>
              <StyledTableCell>Made In</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Stock</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          }
          body={products.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {convertIDFormatted(row?.category?.id, 3)}
              </StyledTableCell>
              <StyledTableCell>{row.category.name}</StyledTableCell>
              <StyledTableCell>{row.size}</StyledTableCell>
              <StyledTableCell>{row.net_weight}</StyledTableCell>
              <StyledTableCell>{row.kg}</StyledTableCell>
              <StyledTableCell>{row.made_in}</StyledTableCell>
              <StyledTableCell>{row.price} Ks</StyledTableCell>
              <StyledTableCell>{row.stock}</StyledTableCell>
              <StyledTableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ m: 1 }}
                  onClick={() => {
                    setIsDetailOpen(true);
                    setDetail(row);
                  }}
                >
                  Detail
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        />
        {total > LIMIT && <CustomPagination pageCount={total / LIMIT} />}
      </Box>
      <ProductDetail
        open={isDetailOpen}
        setOpen={setIsDetailOpen}
        data={detail}
      />
    </>
  );
};

export default StockAlert;

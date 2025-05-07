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
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import {
  deleteProduct,
  getProduct,
  getProducts,
} from "../../store/actions/product";
import ProductCreate from "./ProductCreate";
import { getCategories } from "../../store/actions/category";
import ProductUpdate from "./ProductUpdate";

const ProductList = () => {
  const router = useLocation();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const { loading, products, total } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const query = queryString.parse(router.search);
    if (!("page" in query)) {
      query.page = 1;
    }
    query.limit = 5
    dispatch(getProducts(query));
    dispatch(getCategories());
  }, [dispatch, router.search]);

  const handleDelete = (id) => {
    if (window.confirm("Are sure want to delete?")) {
      dispatch(deleteProduct(id));
    }
  };

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
          Products
        </Typography>
        <Box sx={{ flexGrow: 1, mb: 2 }}>
          <Grid alignItems="center" container spacing={2}>
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                endIcon={<AddIcon />}
                color="success"
                onClick={() => setIsCreateOpen(true)}
              >
                New
              </Button>
            </Grid>
          </Grid>
        </Box>
        <CustomTable
          header={
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Size</StyledTableCell>
              <StyledTableCell>Net Weight</StyledTableCell>
              <StyledTableCell>Kg</StyledTableCell>
              <StyledTableCell>MadeIn</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Stock</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          }
          body={products.map((row, index) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell>{row.category.name}</StyledTableCell>
              <StyledTableCell>{row.size}</StyledTableCell>
              <StyledTableCell>{row.net_weight}</StyledTableCell>
              <StyledTableCell>{row.kg}</StyledTableCell>
              <StyledTableCell>{row.made_in}</StyledTableCell>
              <StyledTableCell>{row.price}</StyledTableCell>
              <StyledTableCell>{row.stock}</StyledTableCell>
              <StyledTableCell>
                <Button
                  variant="contained"
                  color="info"
                  sx={{ m: 1 }}
                  onClick={async () => {
                    dispatch(getProduct(row.id));
                    setIsUpdateOpen(true);
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ m: 1 }}
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        />
        {total > 5 && <CustomPagination pageCount={total / 5} />}
      </Box>
      <ProductUpdate open={isUpdateOpen} setOpen={setIsUpdateOpen} />
      <ProductCreate open={isCreateOpen} setOpen={setIsCreateOpen} />
    </>
  );
};

export default ProductList;

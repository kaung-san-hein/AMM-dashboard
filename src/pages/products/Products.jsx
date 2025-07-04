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
import { useLocation, useNavigate } from "react-router-dom";
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
import { LIMIT } from "../../utils/constant";
import ProductDetail from "./ProductDetail";
import { convertIDFormatted } from "../../utils/convertIDFormatted";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";

const ProductList = () => {
  const router = useLocation();
  const navigate = useNavigate();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, products, total } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const query = queryString.parse(router.search);
    if (!("page" in query)) {
      query.page = 1;
    }
    query.limit = LIMIT;
    dispatch(getProducts(query));
    dispatch(getCategories());
  }, [dispatch, router.search]);

  const handleDelete = (id) => {
    if (window.confirm("Are sure want to delete?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleSearch = () => {
    const query = queryString.parse(router.search);
    query.page = 1;

    if (searchTerm !== "") {
      query.search = searchTerm;
    } else {
      delete query["search"];
    }

    navigate(`?${queryString.stringify(query)}`);
  }

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

            <Grid item xs={12} md={9}>
              <Grid
                container
                spacing={1}
                justifyContent="flex-end"
                alignItems="center"
              >
                <Grid item xs={5} sm={4} md={4}>
                  <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4} sm={3} md={3}>
                  <Button
                    variant="contained"
                    endIcon={<SearchIcon />}
                    color="primary"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
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
        {total > LIMIT && <CustomPagination pageCount={total / LIMIT} />}
      </Box>
      <ProductUpdate open={isUpdateOpen} setOpen={setIsUpdateOpen} />
      <ProductCreate open={isCreateOpen} setOpen={setIsCreateOpen} />
      <ProductDetail
        open={isDetailOpen}
        setOpen={setIsDetailOpen}
        data={detail}
      />
    </>
  );
};

export default ProductList;

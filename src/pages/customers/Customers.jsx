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
  deleteCustomer,
  getCustomer,
  getCustomers,
} from "../../store/actions/customer";
import CustomerCreate from "./CustomerCreate";
import CustomerUpdate from "./CustomerUpdate";
import { LIMIT } from "../../utils/constant";
import { convertIDFormatted } from "../../utils/convertIDFormatted";

const CustomerList = () => {
  const router = useLocation();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const { loading, customers, total } = useSelector((state) => state.customer);
  const dispatch = useDispatch();

  useEffect(() => {
    const query = queryString.parse(router.search);
    if (!("page" in query)) {
      query.page = 1;
    }
    query.limit = LIMIT
    dispatch(getCustomers(query));
  }, [dispatch, router.search]);

  const handleDelete = (id) => {
    if (window.confirm("Are sure want to delete?")) {
      dispatch(deleteCustomer(id));
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
          Retailers
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
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Phone No</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          }
          body={customers.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {convertIDFormatted(row.id)}
              </StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.phone_no}</StyledTableCell>
              <StyledTableCell>{row.address}</StyledTableCell>
              <StyledTableCell>
                <Button
                  variant="contained"
                  color="info"
                  sx={{ m: 1 }}
                  onClick={async () => {
                    dispatch(getCustomer(row.id));
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
      <CustomerUpdate open={isUpdateOpen} setOpen={setIsUpdateOpen} />
      <CustomerCreate open={isCreateOpen} setOpen={setIsCreateOpen} />
    </>
  );
};

export default CustomerList;

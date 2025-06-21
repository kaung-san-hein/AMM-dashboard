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
import {
  deleteCustomerInvoice,
  getCustomerInvoices,
} from "../../store/actions/customerInvoice";
import { LIMIT } from "../../utils/constant";
import { formatUTCToMyanmarTime } from "../../utils/convertFormattedDate";
import SaleDetail from "./SaleDetail";

const SaleInvoiceList = () => {
  const router = useLocation();

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detail, setDetail] = useState(null);

  const { loading, customerInvoices, total } = useSelector(
    (state) => state.customerInvoice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const query = queryString.parse(router.search);
    if (!("page" in query)) {
      query.page = 1;
    }
    query.limit = LIMIT;
    dispatch(getCustomerInvoices(query));
  }, [dispatch, router.search]);

  const handleDelete = (id) => {
    if (window.confirm("Are sure want to delete?")) {
      dispatch(deleteCustomerInvoice(id));
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
          Customer Invoice List
        </Typography>
        <CustomTable
          header={
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Voucher No</StyledTableCell>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Phone No</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          }
          body={customerInvoices.map((row, index) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell>{row?.date}</StyledTableCell>
              <StyledTableCell>{row?.customer.name}</StyledTableCell>
              <StyledTableCell>{row?.customer.phone_no}</StyledTableCell>
              <StyledTableCell>
                {formatUTCToMyanmarTime(row?.date)}
              </StyledTableCell>
              <StyledTableCell>{row.total} Ks</StyledTableCell>
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
      <SaleDetail open={isDetailOpen} setOpen={setIsDetailOpen} data={detail} />
    </>
  );
};

export default SaleInvoiceList;

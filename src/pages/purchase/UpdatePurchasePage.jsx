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
  deleteSupplierInvoice,
  getSupplierOrders,
} from "../../store/actions/supplierInvoice";
import { LIMIT } from "../../utils/constant";
import { formatUTCToMyanmarTime } from "../../utils/convertFormattedDate";
import PurchaseDetail from "./PurchaseDetail";
import { getSupplierInvoice } from "../../store/actions/supplierInvoice";
import UpdateStatus from "./UpdateStatus";
import { getStatusBadge } from "../../utils/getStatus";

const UpdatePurchasePage = () => {
  const router = useLocation();

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);

  const { loading, supplierOrders, total } = useSelector(
    (state) => state.supplierInvoice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const query = queryString.parse(router.search);
    if (!("page" in query)) {
      query.page = 1;
    }
    query.limit = LIMIT;
    dispatch(getSupplierOrders(query));
  }, [dispatch, router.search]);

  const handleDelete = (id) => {
    if (window.confirm("Are sure want to delete?")) {
      dispatch(deleteSupplierInvoice(id));
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
          Purchase Page
        </Typography>
        <CustomTable
          header={
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Voucher No</StyledTableCell>
              <StyledTableCell>Supplier Name</StyledTableCell>
              <StyledTableCell>Phone No</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          }
          body={supplierOrders.map((row, index) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell>{row?.date}</StyledTableCell>
              <StyledTableCell>{row?.supplier.name}</StyledTableCell>
              <StyledTableCell>{row?.supplier.phone_no}</StyledTableCell>
              <StyledTableCell>
                {formatUTCToMyanmarTime(row?.date)}
              </StyledTableCell>
              <StyledTableCell>{row.total} Ks</StyledTableCell>
              <StyledTableCell>{getStatusBadge(row.status)}</StyledTableCell>
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
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ m: 1 }}
                  onClick={async () => {
                    dispatch(getSupplierInvoice(row.id));
                    setIsUpdateStatusOpen(true);
                  }}
                >
                  Update
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        />
        {total > LIMIT && <CustomPagination pageCount={total / LIMIT} />}
      </Box>
      <PurchaseDetail
        open={isDetailOpen}
        setOpen={setIsDetailOpen}
        data={detail}
      />
      <UpdateStatus
        open={isUpdateStatusOpen}
        setOpen={setIsUpdateStatusOpen}
        data={detail}
      />
    </>
  );
};

export default UpdatePurchasePage;

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
import { call } from "../../services/api";
import { Download } from "@mui/icons-material";
import { NotificationManager } from "react-notifications";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const SaleInvoiceList = () => {
  const router = useLocation();

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

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

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      const response = await call('get', 'customer-invoices/export');
      const data = response.data || response;

      // Initialize PDF document
      const doc = new jsPDF('l', 'pt', 'a4');
      
      // Set title
      doc.setFontSize(16);
      doc.text('Customer Invoice List', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
      
      // Set date
      doc.setFontSize(10);
      doc.text(`Exported on: ${new Date().toLocaleDateString()}`, doc.internal.pageSize.getWidth() / 2, 50, { align: 'center' });

      // Prepare table data
      const tableHeaders = ['No', 'Voucher No', 'Customer Name', 'Phone No', 'Date', 'Item Count', 'Total'];
      const tableRows = data.map((row, index) => [
        index + 1,
        row?.date || '-',
        row?.customer?.name || '-',
        row?.customer?.phone_no || '-',
        formatUTCToMyanmarTime(row?.date),
        row?.item_count || row?.customer_invoice_items?.length || 0,
        `${row?.total || 0} Ks`
      ]);

      // Add table to PDF
      autoTable(doc, {
        head: [tableHeaders],
        body: tableRows,
        startY: 70,
        theme: 'grid',
        styles: {
          fontSize: 8,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [156, 39, 176], // Purple color
          textColor: 255,
          fontStyle: 'bold',
        },
        columnStyles: {
          0: { cellWidth: 30 }, // No
          1: { cellWidth: 100 }, // Voucher No
          2: { cellWidth: 120 }, // Customer Name
          3: { cellWidth: 100 }, // Phone No
          4: { cellWidth: 100 }, // Date
          5: { cellWidth: 60 }, // Item Count
          6: { cellWidth: 80 }, // Total
        },
      });

      // Save the PDF
      doc.save(`customer-invoices-${new Date().toISOString().split('T')[0]}.pdf`);
      
      NotificationManager.success('PDF exported successfully!');
    } catch (error) {
      NotificationManager.error(error.message || 'Export failed');
    } finally {
      setIsExporting(false);
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="h5"
            sx={{
              fontWeight: "bold",
              color: "var(--primary-color)",
            }}
          >
            Customer Invoice List
          </Typography>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={handleExportPDF}
            disabled={isExporting}
            sx={{
              backgroundColor: "#2e7d32",
              color: "white",
              "&:hover": {
                backgroundColor: "#1b5e20",
              },
              "&:disabled": {
                backgroundColor: "#a5d6a7",
                color: "white",
              },
            }}
          >
            {isExporting ? "Exporting..." : "Export PDF"}
          </Button>
        </Box>
        <CustomTable
          header={
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Voucher No</StyledTableCell>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Phone No</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Item Count</StyledTableCell>
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
              <StyledTableCell>
                {row?.item_count || row?.customer_invoice_items?.length || 0}
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

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
  getSupplierInvoices,
} from "../../store/actions/supplierInvoice";
import { LIMIT } from "../../utils/constant";
import { formatUTCToMyanmarTime } from "../../utils/convertFormattedDate";
import PurchaseDetail from "./PurchaseDetail";
import { getStatusBadge } from "../../utils/getStatus";
import { call } from "../../services/api";
import { Download } from "@mui/icons-material";
import { NotificationManager } from "react-notifications";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PurchaseInvoiceList = () => {
  const router = useLocation();

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const { loading, supplierInvoices, total } = useSelector(
    (state) => state.supplierInvoice
  );
  const dispatch = useDispatch();

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      const response = await call('get', 'supplier-invoices/export');
      const data = response.data || response;

      // Initialize PDF document
      const doc = new jsPDF('l', 'pt', 'a4');
      
      // Set title
      doc.setFontSize(16);
      doc.text('Supplier Invoice List', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
      
      // Set date
      doc.setFontSize(10);
      doc.text(`Exported on: ${new Date().toLocaleDateString()}`, doc.internal.pageSize.getWidth() / 2, 50, { align: 'center' });

      // Prepare table data
      const tableHeaders = ['No', 'Voucher No', 'Supplier Name', 'Phone No', 'Date', 'Item Count', 'Total', 'Status'];
      const tableRows = data.map((row, index) => [
        index + 1,
        row?.voucher_no || row?.date || '-',
        row?.supplier?.name || '-',
        row?.supplier?.phone_no || '-',
        formatUTCToMyanmarTime(row?.date),
        row?.item_count || row?.supplier_invoice_items?.length || 0,
        `${row?.total || 0} Ks`,
        row?.status || '-'
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
          1: { cellWidth: 80 }, // Voucher No
          2: { cellWidth: 120 }, // Supplier Name
          3: { cellWidth: 100 }, // Phone No
          4: { cellWidth: 100 }, // Date
          5: { cellWidth: 60 }, // Item Count
          6: { cellWidth: 80 }, // Total
          7: { cellWidth: 60 }, // Status
        },
      });

      // Save the PDF
      doc.save(`supplier-invoices-${new Date().toISOString().split('T')[0]}.pdf`);
      
      NotificationManager.success('PDF exported successfully!');
    } catch (error) {
      NotificationManager.error(error.message || 'Export failed');
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    const query = queryString.parse(router.search);
    if (!("page" in query)) {
      query.page = 1;
    }
    query.limit = LIMIT;
    dispatch(getSupplierInvoices(query));
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
            Supplier Invoice List
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
              <StyledTableCell>Supplier Name</StyledTableCell>
              <StyledTableCell>Phone No</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          }
          body={supplierInvoices.map((row, index) => (
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
    </>
  );
};

export default PurchaseInvoiceList;

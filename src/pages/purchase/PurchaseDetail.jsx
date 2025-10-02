import { Box, Grid, TableRow, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { DetailDataRow } from "../../components/detailDataRow/DetailDataRow";
import CustomModal from "../../components/modal/CustomModal";
import CustomTable, { StyledTableCell, StyledTableRow } from "../../components/table/CustomTable";
import { formatUTCToMyanmarTime } from "../../utils/convertFormattedDate";
import { getStatusBadge } from "../../utils/getStatus";

const PurchaseDetail = ({ open, setOpen, data }) => {
  const handlePrint = () => {
    // Create print-specific content
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Purchase Invoice - ${data?.date}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              line-height: 1.6;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .company-name {
              font-size: 24px;
              font-weight: bold;
              color: #1976d2;
              margin-bottom: 5px;
            }
            .invoice-title {
              font-size: 18px;
              color: #666;
            }
            .info-section {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
            }
            .supplier-info, .invoice-info {
              flex: 1;
            }
            .info-row {
              margin-bottom: 8px;
            }
            .label {
              font-weight: bold;
              color: #333;
            }
            .value {
              color: #666;
            }
            .total-section {
              border-top: 1px solid #ddd;
              padding-top: 15px;
              margin: 20px 0;
              text-align: right;
            }
            .total-amount {
              font-size: 18px;
              font-weight: bold;
              color: #1976d2;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
            }
            th {
              background-color: #f5f5f5;
              font-weight: bold;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              color: #666;
              font-size: 14px;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">Information Management System for Home Construction</div>
            <div class="invoice-title">PURCHASE INVOICE</div>
          </div>
          
          <div class="info-section">
            <div class="supplier-info">
              <div class="info-row">
                <span class="label">Supplier Name:</span>
                <span class="value">${data?.supplier?.name || 'N/A'}</span>
              </div>
              <div class="info-row">
                <span class="label">Phone No:</span>
                <span class="value">${data?.supplier?.phone_no || 'N/A'}</span>
              </div>
            </div>
            <div class="invoice-info">
              <div class="info-row">
                <span class="label">Voucher No:</span>
                <span class="value">${data?.date || 'N/A'}</span>
              </div>
              <div class="info-row">
                <span class="label">Date:</span>
                <span class="value">${formatUTCToMyanmarTime(data?.date)}</span>
              </div>
              <div class="info-row">
                <span class="label">Status:</span>
                <span class="value">${data?.status || 'N/A'}</span>
              </div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Product Size</th>
                <th>Quantity</th>
                <th>Price (Ks)</th>
                <th>Subtotal (Ks)</th>
              </tr>
            </thead>
            <tbody>
              ${data?.supplier_invoice_items?.map((item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.product.size}</td>
                  <td>${item.quantity}</td>
                  <td>${item.price.toLocaleString()}</td>
                  <td>${(item.quantity * item.price).toLocaleString()}</td>
                </tr>
              `).join('') || '<tr><td colspan="5" style="text-align: center;">No items</td></tr>'}
            </tbody>
          </table>
          
          <div class="total-section">
            <div class="total-amount">
              Total: ${data?.total?.toLocaleString()} Ks
            </div>
          </div>
          
          <div class="footer">
            <p>Thank you for your business!</p>
            <p>Generated on ${new Date().toLocaleString()}</p>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <CustomModal
      title="Purchase Detail"
      isOpen={open}
      onClick={() => setOpen(!open)}
    >
      <DetailDataRow title="Voucher No" text={data?.date} />
      <DetailDataRow title="Supplier Name" text={data?.supplier?.name} />
      <DetailDataRow title="Phone No" text={data?.supplier?.phone_no} />
      <DetailDataRow title="Date" text={formatUTCToMyanmarTime(data?.date)} />
      <DetailDataRow title="Status" text={getStatusBadge(data?.status)} />
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", minWidth: "80px", color: "primary.main" }}
        >
          Total
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", minWidth: "80px" }}
        >
          {" "}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          {data?.total?.toLocaleString()} Ks
        </Typography>
      </Box>

      <CustomTable
        header={
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Product Size</StyledTableCell>
            <StyledTableCell>Quantity</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell>Subtotal</StyledTableCell>
          </TableRow>
        }
        body={data?.supplier_invoice_items?.map((row, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell component="th" scope="row">
              {index + 1}
            </StyledTableCell>
            <StyledTableCell>{row.product.size}</StyledTableCell>
            <StyledTableCell>{row.quantity}</StyledTableCell>
            <StyledTableCell>{row.price} Ks</StyledTableCell>
            <StyledTableCell>{row.quantity * row.price} Ks</StyledTableCell>
          </StyledTableRow>
        ))}
      />
      <Grid
        mt={3}
        justifyContent="end"
        alignItems="center"
        container
        spacing={2}
      >
        <Grid item>
          <Button variant="contained" color="secondary" onClick={handlePrint}>
            Print
          </Button>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default PurchaseDetail;

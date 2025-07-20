import { TableRow, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DetailDataRow } from "../../components/detailDataRow/DetailDataRow";
import CustomModal from "../../components/modal/CustomModal";
import CustomTable, { StyledTableCell, StyledTableRow } from "../../components/table/CustomTable";
import { formatUTCToMyanmarTime } from "../../utils/convertFormattedDate";
import { getStatusBadge } from "../../utils/getStatus";

const PurchaseDetail = ({ open, setOpen, data }) => {
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
    </CustomModal>
  );
};

export default PurchaseDetail;

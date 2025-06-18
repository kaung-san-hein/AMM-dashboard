import { TableRow } from "@mui/material";
import { DetailDataRow } from "../../components/detailDataRow/DetailDataRow";
import CustomModal from "../../components/modal/CustomModal";
import CustomTable, { StyledTableCell, StyledTableRow } from "../../components/table/CustomTable";
import { formatUTCToMyanmarTime } from "../../utils/convertFormattedDate";

const SaleDetail = ({ open, setOpen, data }) => {
  return (
    <CustomModal
      title="Sale Detail"
      isOpen={open}
      onClick={() => setOpen(!open)}
    >
      <DetailDataRow title="Voucher No" text={data?.date} />
      <DetailDataRow title="Customer Name" text={data?.customer?.name} />
      <DetailDataRow title="Phone No" text={data?.customer?.phone_no} />
      <DetailDataRow title="Date" text={formatUTCToMyanmarTime(data?.date)} />
      <DetailDataRow title="Total" text={`${data?.total} Ks`} />
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
        body={data?.customer_invoice_items?.map((row, index) => (
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

export default SaleDetail;

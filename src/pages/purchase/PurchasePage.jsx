import { Box, Button, Grid, Typography } from "@mui/material";
import BackButton from "../../components/backButton/BackButton";
import { useCallback, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CustomTable, {
  StyledTableCell,
  StyledTableRow,
} from "../../components/table/CustomTable";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/actions/product";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import CustomSelectBox from "../../components/selectbox/CustomSelectBox";
import { NotificationManager } from "react-notifications";
import { getSuppliers } from "../../store/actions/supplier";
import { createSupplierInvoice } from "../../store/actions/supplierInvoice";
import AddPurchaseItem from "./AddPurchaseItem";

const PurchasePage = () => {
  const router = useLocation();

  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState([]);
  const [isAddItem, setIsAddItem] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const dispatch = useDispatch();

  const { suppliers } = useSelector((state) => state.supplier);
  const { success } = useSelector((state) => state.supplierInvoice);

  const optionSuppliers = suppliers.map((supplier) => {
    return {
      value: supplier.id,
      label: supplier.name,
    };
  });

  useEffect(() => {
    const query = queryString.parse(router.search);
    dispatch(getProducts(query));
    dispatch(getSuppliers(query));
  }, [dispatch, router.search]);

  const handleDelete = (index) => {
    const filter = items.filter((_, i) => index !== i);
    setItems(filter);
  };

  const handleSale = async () => {
    setLoading(true);
    if (!selectedSupplier) {
      NotificationManager.error("Please select supplier!");
      setLoading(false);
      return
    }

    if (items.length === 0) {
      NotificationManager.error("Please provide purchase items!");
      setLoading(false);
      return
    }

    let total = 0;

    const saleItems = items.map((item) => {
      total += item.quantity * item.price;

      return {
        product_id: item.product.id,
        quantity: +item.quantity,
        price: +item.price,
      };
    });

    const payload = {
      supplier_id: selectedSupplier?.value,
      date: new Date().toISOString(),
      total,
      items: saleItems,
    };

    await dispatch(createSupplierInvoice(payload));
    setLoading(false);
  };

  const handleReset = useCallback(() => {
    setSelectedSupplier(null);
    setItems([]);
  }, []);

  useEffect(() => {
    if (success) {
      handleReset();
    }

    return () => handleReset();
  }, [success, handleReset]);

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
          Order Page
        </Typography>
        <Box sx={{ flexGrow: 1, mb: 2 }}>
          <Grid
            container
            alignItems="center"
            spacing={2}
            justifyContent="space-between"
          >
            <Grid item>
              <Button
                variant="contained"
                endIcon={<AddIcon />}
                color="success"
                onClick={() => setIsAddItem(true)}
              >
                Add Item
              </Button>
            </Grid>
            <Grid item xs={3}>
              <CustomSelectBox
                value={selectedSupplier}
                onChange={setSelectedSupplier}
                label="Select Supplier"
                options={optionSuppliers}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                endIcon={<ReceiptLongIcon />}
                color="success"
                onClick={() => handleSale(handleSale)}
                disabled={loading}
              >
                {loading ? "Loading..." : "Order"}
              </Button>
            </Grid>
          </Grid>
        </Box>
        <CustomTable
          header={
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Product Size</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Subtotal</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          }
          body={items.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell>{row.product.size}</StyledTableCell>
              <StyledTableCell>{row.quantity}</StyledTableCell>
              <StyledTableCell>{row.product.price} Ks</StyledTableCell>
              <StyledTableCell>
                {row.quantity * row.product.price} Ks
              </StyledTableCell>
              <StyledTableCell>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ m: 1 }}
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        />
      </Box>
      <AddPurchaseItem open={isAddItem} setOpen={setIsAddItem} setItems={setItems} />
    </>
  );
};

export default PurchasePage;

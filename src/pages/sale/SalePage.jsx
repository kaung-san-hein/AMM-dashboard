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
import AddItem from "./AddItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/actions/product";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { getCustomers } from "../../store/actions/customer";
import CustomSelectBox from "../../components/selectbox/CustomSelectBox";
import { NotificationManager } from "react-notifications";
import { createCustomerInvoice } from "../../store/actions/customerInvoice";

const SalePage = () => {
  const router = useLocation();

  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState([]);
  const [isAddItem, setIsAddItem] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const dispatch = useDispatch();

  const { customers } = useSelector((state) => state.customer);
  const { success } = useSelector((state) => state.customerInvoice);

  const optionCustomers = customers.map((customer) => {
    return {
      value: customer.id,
      label: customer.name,
    };
  });

  useEffect(() => {
    const query = queryString.parse(router.search);
    dispatch(getProducts(query));
    dispatch(getCustomers(query));
  }, [dispatch, router.search]);

  const handleDelete = (index) => {
    const filter = items.filter((_, i) => index !== i);
    setItems(filter);
  };

  const handleSale = async () => {
    setLoading(true);
    if (!selectedCustomer || items.length === 0) {
      NotificationManager.error("Please provide sale items!");
    }

    let total = 0;

    const saleItems = items.map((item) => {
      total += item.quantity * item.product.price;

      return {
        product_id: item.product.id,
        quantity: +item.quantity,
        price: item.product.price,
      };
    });

    const payload = {
      customer_id: selectedCustomer,
      date: new Date().toISOString(),
      total,
      items: saleItems,
    };

    await dispatch(createCustomerInvoice(payload));
    setLoading(false);
  };

  const handleReset = useCallback(() => {
    setSelectedCustomer("");
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
          Sale Screen
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
            <Grid item>
              <CustomSelectBox
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                onClear={() => setSelectedCustomer("")}
                label="Select Customer"
                options={optionCustomers}
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
                {loading ? "Loading..." : "Sale"}
              </Button>
            </Grid>
          </Grid>
        </Box>
        <CustomTable
          header={
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
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
              <StyledTableCell>{row.product.price}</StyledTableCell>
              <StyledTableCell>
                {row.quantity * row.product.price}
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
      <AddItem open={isAddItem} setOpen={setIsAddItem} setItems={setItems} />
    </>
  );
};

export default SalePage;

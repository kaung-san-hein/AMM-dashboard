import { Box, Button, Grid, Typography } from "@mui/material";
import BackButton from "../../components/backButton/BackButton";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CustomTable, {
  StyledTableCell,
  StyledTableRow,
} from "../../components/table/CustomTable";
import TableRow from "@mui/material/TableRow";
import AddItem from "./AddItem";
import { useDispatch } from "react-redux";
import { getProducts } from "../../store/actions/product";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const SalePage = () => {
  const router = useLocation();

  const [items, setItems] = useState([]);
  const [isAddItem, setIsAddItem] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const query = queryString.parse(router.search);
    dispatch(getProducts(query));
  }, [dispatch, router.search]);

  const handleDelete = (index) => {
    const filter = items.filter((_, i) => index !== i);
    setItems(filter);
  };

  const handleSale = () => {
    let total = 0

    const saleItems = items.map((item) => {
        total += item.quantity * item.product.price

        return {
            product_id: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
        }
    })

    const payload = {
        date: new Date().toISOString(),
        total,
        items: saleItems
    }

    console.log(payload)
  };

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
              <Button
                variant="contained"
                endIcon={<ReceiptLongIcon />}
                color="success"
                onClick={() => handleSale(handleSale)}
              >
                Sale
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

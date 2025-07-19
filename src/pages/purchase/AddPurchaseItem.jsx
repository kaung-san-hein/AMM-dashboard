import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CustomModal from "../../components/modal/CustomModal";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import CustomSelect from "../../components/input/CustomSelect";
import CustomNumberField from "../../components/input/CustomNumberField";

const AddPurchaseItem = ({ open, setOpen, setItems }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const { products } = useSelector((state) => state.product);

  const optionProducts = products.map((product) => {
    return {
      value: product.id,
      label: product.size,
    };
  });

  const onSubmit = async (data) => {
    const selectedProduct = products.find(
      (product) => product.id === data.product.value
    );

    const item = {
      ...data,
      product: selectedProduct,
    };

    setItems((prev) => [...prev, item]);

    handleReset();
  };

  const handleReset = useCallback(() => {
    reset({
      product: null,
      quantity: null,
      price: null,
    });
  }, [reset]);

  return (
    <CustomModal
      title="New Item"
      isOpen={open}
      onClick={(prev) => setOpen(!prev)}
    >
      <Grid alignItems="center" container spacing={2}>
        <Grid item xs={12} md={12}>
          <CustomSelect
            id="product"
            label="Product"
            control={control}
            errors={errors}
            options={optionProducts}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <CustomNumberField
            id="quantity"
            label="Quantity"
            register={{
              ...register("quantity", {
                required: "Quantity is required!",
              }),
            }}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <CustomNumberField
            id="price"
            label="Price"
            register={{
              ...register("price", {
                required: "Price is required!",
              }),
            }}
            errors={errors}
          />
        </Grid>
      </Grid>
      <Grid
        mt={3}
        justifyContent="end"
        alignItems="center"
        container
        spacing={2}
      >
        <Grid item>
          <Button variant="contained" color="secondary" onClick={handleReset}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit(onSubmit)}
          >
            Add
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(false)}
          >
            OK
          </Button>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default AddPurchaseItem;

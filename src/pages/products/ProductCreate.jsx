import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CustomTextField from "../../components/input/CustomTextField";
import CustomNumberField from "../../components/input/CustomNumberField";
import Grid from "@mui/material/Grid";
import CustomModal from "../../components/modal/CustomModal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../store/actions/product";
import CustomSelect from "../../components/input/CustomSelect";

const ProductCreate = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);

  const optionCategories = categories.map((category) => {
    return {
      value: category.id,
      label: category.name,
    };
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const payload = {
        ...data,
        kg: Number(data.kg),
        price: Number(data.price),
        stock: Number(data.stock),
      };
    await dispatch(createProduct(payload));
    setLoading(false);
  };

  const handleReset = useCallback(() => {
    reset({
      category_id: "",
      size: "",
      description: "",
      net_weight: "",
      kg: null,
      made_in: "",
      price: null,
      stock: null,
    });
  }, [reset]);

  useEffect(() => {
    if (success) {
      handleReset();
    }

    return () => handleReset();
  }, [success, handleReset]);

  return (
    <CustomModal
      title="New Product"
      isOpen={open}
      onClick={(prev) => setOpen(!prev)}
    >
      <Grid alignItems="center" container spacing={2}>
        <Grid item xs={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <CustomTextField
                id="size"
                label="Size"
                register={{
                  ...register("size", {
                    required: "Size is required!",
                  }),
                }}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomTextField
                id="description"
                label="Description"
                register={{
                  ...register("description", {
                    required: "Description is required!",
                  }),
                }}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomTextField
                id="net_weight"
                label="Net Weight"
                register={{
                  ...register("net_weight", {
                    required: "Net Weight is required!",
                  }),
                }}
                errors={errors}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <CustomNumberField
                id="kg"
                label="Kg"
                register={{
                  ...register("kg", {
                    required: "Kg is required!",
                  }),
                }}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomTextField
                id="made_in"
                label="Made In"
                register={{
                  ...register("made_in", {
                    required: "Made In is required!",
                  }),
                }}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={4}>
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
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <CustomNumberField
                id="stock"
                label="Stock"
                register={{
                  ...register("stock", {
                    required: "Stock is required!",
                  }),
                }}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomSelect
                id="category_id"
                label="Category"
                control={control}
                errors={errors}
                options={optionCategories}
              />
            </Grid>
          </Grid>
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
            disabled={loading}
          >
            {loading ? "Loading..." : "Save"}
          </Button>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default ProductCreate;

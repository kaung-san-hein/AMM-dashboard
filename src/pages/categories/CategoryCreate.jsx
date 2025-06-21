import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CustomTextField from "../../components/input/CustomTextField";
import Grid from "@mui/material/Grid";
import CustomModal from "../../components/modal/CustomModal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../store/actions/category";

const CategoryCreate = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.category);

  const onSubmit = async (data) => {
    setLoading(true);
    await dispatch(createCategory(data));
    setLoading(false);
  };

  const handleReset = useCallback(() => {
    reset({
      name: "",
    });
  }, [reset]);

  useEffect(() => {
    if (success) {
      handleReset();
      setOpen(false);
    }

    return () => handleReset();
  }, [success, handleReset, setOpen]);

  return (
    <CustomModal
      title="New Category"
      isOpen={open}
      onClick={(prev) => setOpen(!prev)}
    >
      <Grid alignItems="center" container spacing={2}>
        <Grid item xs={12} md={12}>
          <CustomTextField
            id="name"
            label="Name"
            register={{
              ...register("name", {
                required: "Name is required!",
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
            disabled={loading}
          >
            {loading ? "Loading..." : "Save"}
          </Button>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default CategoryCreate;

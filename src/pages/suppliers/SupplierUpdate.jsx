import { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CustomTextField from "../../components/input/CustomTextField";
import Grid from "@mui/material/Grid";
import CustomModal from "../../components/modal/CustomModal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateSupplier } from "../../store/actions/supplier";

const SupplierUpdate = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { success, supplier } = useSelector((state) => state.supplier);

  useEffect(() => {
    const { name, phone_no, address } = supplier;

    setValue("name", name);
    setValue("phone_no", phone_no);
    setValue("address", address);
  }, [setValue, supplier]);

  const onSubmit = async (data) => {
    setLoading(true);
    await dispatch(updateSupplier({ ...data, id: supplier.id }));
    setLoading(false);
  };

  const handleReset = useCallback(() => {
    reset({
      name: "",
      phone_no: "",
      address: "",
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
      title="Update Supplier"
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
        <Grid item xs={12} md={12}>
          <CustomTextField
            id="phone_no"
            label="Phone No"
            register={{
              ...register("phone_no", {
                required: "Phone No is required!",
              }),
            }}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <CustomTextField
            id="address"
            label="Address"
            register={{
              ...register("address", {
                required: "Address is required!",
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
            {loading ? "Loading..." : "Update"}
          </Button>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default SupplierUpdate;

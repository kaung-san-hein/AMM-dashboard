import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CustomModal from "../../components/modal/CustomModal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateSupplierInvoiceStatus } from "../../store/actions/supplierInvoice";
import CustomSelect from "../../components/input/CustomSelect";
import { getStockAlertCount } from "../../store/actions/stockAlert";

const optionStatus = [
  { label: "pending", value: "pending" },
  { label: "paid", value: "paid" },
  { label: "cancelled", value: "cancelled" },
];

const UpdateStatus = ({ open, setOpen }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { success, supplierInvoice } = useSelector(
    (state) => state.supplierInvoice
  );

  useEffect(() => {
    const { status } = supplierInvoice;

    setValue("status", { value: status, label: status });
  }, [setValue, supplierInvoice]);

  const onSubmit = async (data) => {
    setLoading(true);
    await dispatch(
      updateSupplierInvoiceStatus({
        id: supplierInvoice.id,
        status: data.status.value,
      })
    );
    setLoading(false);
  };

  const handleReset = useCallback(() => {
    reset({
      status: null,
    });
  }, [reset]);

  useEffect(() => {
    if (success) {
      handleReset();
      setOpen(false);
      dispatch(getStockAlertCount());
    }

    return () => handleReset();
  }, [success, handleReset, setOpen, dispatch]);

  return (
    <CustomModal
      title="Update Status"
      isOpen={open}
      onClick={(prev) => setOpen(!prev)}
    >
      <Grid alignItems="center" container spacing={2}>
        <Grid item xs={12} md={12}>
          <CustomSelect
            id="status"
            label="Status"
            control={control}
            errors={errors}
            options={optionStatus}
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

export default UpdateStatus;

import React from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const CustomNumberField = ({
  id,
  label,
  register,
  errors,
}) => {
  return (
    <>
      <TextField
        id={id}
        type="number"
        label={label}
        color="info"
        size="small"
        fullWidth
        sx={{
          fieldset: { borderColor: "var(--primary-color)" },
        }}
        {...register}
      />
      {errors[id] && (
        <span style={{ color: "red" }}>{errors[id]?.message}</span>
      )}
    </>
  );
};

CustomNumberField.propTypes = {
  label: PropTypes.string.isRequired,
};

export default CustomNumberField;

import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import PropTypes from "prop-types";

const CustomSelect = ({ id, label, register, errors, options }) => {
  return (
    <>
      <FormControl fullWidth size="small" error={Boolean(errors[id])}>
        <InputLabel>{label}</InputLabel>
        <Select
          id={id}
          {...register}
          label={label}
          sx={{
            fieldset: { borderColor: "var(--primary-color)" },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {errors[id] && <FormHelperText>{errors[id]?.message}</FormHelperText>}
      </FormControl>
    </>
  );
};

CustomSelect.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default CustomSelect;

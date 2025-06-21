import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const CustomAutocomplete = ({ label, value, onChange, options }) => {
  return (
    <Autocomplete
      size="small"
      fullWidth
      options={options}
      getOptionLabel={(option) => option.label}
      value={value}
      onChange={(_, data) => onChange(data)}
      isOptionEqualToValue={(option, value) => option.value === value?.value}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
          }}
        />
      )}
    />
  );
};

export default CustomAutocomplete;

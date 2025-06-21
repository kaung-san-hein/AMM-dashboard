import {
  FormControl,
  FormHelperText,
  Autocomplete,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";

const CustomSelect = ({ id, label, control, errors, options }) => {
  return (
    <FormControl fullWidth size="small" error={!!errors[id]}>
      <Controller
        name={id}
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            size="small"
            fullWidth
            options={options}
            getOptionLabel={(option) => option.label}
            value={value}
            onChange={(_, data) => onChange(data)}
            isOptionEqualToValue={(option, value) =>
              option.value === value?.value
            }
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
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
        )}
      />
      {errors[id] && <FormHelperText>{errors[id]?.message}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelect;

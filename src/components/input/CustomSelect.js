import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";

const CustomSelect = ({ id, label, control, errors, options }) => {
  return (
    <FormControl fullWidth size="small" error={!!errors[id]}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Controller
        name={id}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select {...field} labelId={`${id}-label`} id={id} label={label}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors[id] && <FormHelperText>{errors[id]?.message}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelect;

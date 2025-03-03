import { TextField, InputAdornment } from "@mui/material";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface FormTextFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  rules?: object;
}

const FormTextField = <T extends FieldValues>({ name, label, control, rules }: FormTextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          variant="outlined"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          InputProps={{
            endAdornment: fieldState.error ? (
              <InputAdornment position="end">
                <ErrorOutlineIcon color="error" />
              </InputAdornment>
            ) : null,
          }}
        />
      )}
    />
  );
};

export default FormTextField;

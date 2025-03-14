import { TextField } from '@mui/material';

const FormInput = ({ register, name, error, required, ...props }) => {
  return (
    <TextField
      {...register(name)}
      error={!!error}
      helperText={error?.message}
      fullWidth
      inputProps={{
        'aria-required': required,
      }}
      sx={{
        mb: 2,
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': {
            borderColor: 'primary.main',
          },
        },
      }}
      {...props}
    />
  );
};

export default FormInput;

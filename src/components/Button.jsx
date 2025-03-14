import { Button, CircularProgress } from '@mui/material';

const SubmitButton = ({ isLoading, children, ...props }) => {
  return (
    <Button
      type='submit'
      fullWidth
      variant='contained'
      disabled={isLoading}
      sx={{
        py: 2,
        fontSize: '1.1rem',
        fontWeight: 600,
        textTransform: 'none',
        borderRadius: 2,
        boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
        },
      }}
      {...props}
    >
      {isLoading ? <CircularProgress size={24} color='inherit' /> : children}
    </Button>
  );
};

export default SubmitButton;

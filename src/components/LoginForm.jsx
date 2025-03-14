import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { Box, Typography, Container, Alert, Paper, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { loginSuccess, loginFailure } from '../store/authSlice';
import { loginSchema } from '../validations/loginSchema';
import FormInput from './FormInput';
import Button from './Button';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError('');

    try {
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            user: { email: data.email, id: 1 },
          });
        }, 1000);
      });

      if (response.success) {
        dispatch(loginSuccess(response.user));
      } else {
        dispatch(loginFailure('Invalid credentials'));
        setServerError('Invalid credentials');
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      setServerError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container component='main' maxWidth='xs'>
        <Paper
          sx={{
            p: { xs: 3, sm: 6 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.95)',
            width: '100%',
            mx: 'auto',
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: 'primary.main',
              width: 56,
              height: 56,
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography
            component='h1'
            variant='h4'
            sx={{
              mb: 4,
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            Welcome Back
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              width: '100%',
              maxWidth: '450px',
            }}
          >
            {serverError && (
              <Alert severity='error' sx={{ mb: 3 }}>
                {serverError}
              </Alert>
            )}
            <FormInput name='email' label='Email Address' register={register} error={errors.email} autoComplete='email' autoFocus required />
            <FormInput
              name='password'
              label='Password'
              type='password'
              register={register}
              error={errors.password}
              autoComplete='current-password'
              required
            />
            <Button isLoading={isLoading || isSubmitting}>Sign In</Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginForm;

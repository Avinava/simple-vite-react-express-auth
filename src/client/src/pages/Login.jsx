import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert,
  Fade,
  IconButton,
  InputAdornment,
  Divider,
  Chip,
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Login as LoginIcon,
  Google as GoogleIcon,
  GitHub as GitHubIcon 
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SuccessMessage from '../components/SuccessMessage';
import NotificationToast from '../components/NotificationToast';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const { login, error, successMessage, clearMessages } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (successMessage) {
      setShowSuccess(true);
      setShowToast(true);
    }
  }, [successMessage]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await login(data);
      // Success message will be shown via useEffect
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    clearMessages();
  };

  return (
    <>
      <Container component="main" maxWidth="sm">
        <Fade in timeout={800}>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Paper 
              elevation={8} 
              sx={{ 
                padding: 4, 
                width: '100%',
                borderRadius: 3,
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: '#ffffff',
                    mb: 2,
                  }}
                >
                  <LoginIcon sx={{ fontSize: 32 }} />
                </Box>
                <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
                  Welcome Back
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Sign in to your account to continue
                </Typography>
              </Box>
              
              {error && (
                <Fade in>
                  <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                    {error}
                  </Alert>
                </Fade>
              )}

              <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ 
                    mt: 3, 
                    mb: 2,
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  }}
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>

                <Divider sx={{ my: 3 }}>
                  <Chip label="or continue with" size="small" />
                </Divider>

                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    sx={{ 
                      borderRadius: 2,
                      py: 1.5,
                      borderColor: '#db4437',
                      color: '#db4437',
                      '&:hover': {
                        borderColor: '#db4437',
                        bgcolor: 'rgba(219, 68, 55, 0.04)',
                      }
                    }}
                  >
                    Google
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    sx={{ 
                      borderRadius: 2,
                      py: 1.5,
                      borderColor: '#333',
                      color: '#333',
                      '&:hover': {
                        borderColor: '#333',
                        bgcolor: 'rgba(51, 51, 51, 0.04)',
                      }
                    }}
                  >
                    GitHub
                  </Button>
                </Box>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Link 
                    component={RouterLink} 
                    to="/forgot-password" 
                    variant="body2"
                    sx={{ 
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Forgot password?
                  </Link>
                </Box>
                
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant="body2">
                    Don't have an account?{' '}
                    <Link 
                      component={RouterLink} 
                      to="/register"
                      sx={{ 
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      Sign up
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Container>

      <SuccessMessage
        open={showSuccess}
        onClose={handleSuccessClose}
        title="Login Successful!"
        message={successMessage}
        icon="login"
        autoClose
        autoCloseDelay={2000}
      />

      <NotificationToast
        open={showToast}
        onClose={() => setShowToast(false)}
        message={successMessage}
        severity="success"
        duration={3000}
      />
    </>
  );
};

export default Login;
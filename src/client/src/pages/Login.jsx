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
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          py: 8,
        }}
      >
        <Container component="main" maxWidth="sm">
          <Fade in timeout={800}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
            <Paper 
              elevation={24} 
              sx={{ 
                padding: 5, 
                width: '100%',
                borderRadius: 4,
                background: '#ffffff',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#ffffff',
                    mb: 3,
                    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
                  }}
                >
                  <LoginIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography component="h1" variant="h3" fontWeight="800" gutterBottom sx={{ color: 'text.primary' }}>
                  Welcome Back
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  Sign in to your account to continue
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account? <Link component={RouterLink} to="/register" sx={{ fontWeight: 600, textDecoration: 'none' }}>Create one here</Link>
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
                    mt: 4, 
                    mb: 3,
                    py: 2,
                    borderRadius: 3,
                    fontSize: '1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
                    },
                    '&:disabled': {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      opacity: 0.7,
                    }
                  }}
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>

                <Divider sx={{ my: 4 }}>
                  <Chip 
                    label="or continue with" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'grey.100',
                      color: 'text.secondary',
                      fontWeight: 500,
                    }}
                  />
                </Divider>

                <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    sx={{ 
                      borderRadius: 3,
                      py: 2,
                      borderColor: '#db4437',
                      color: '#db4437',
                      fontWeight: 600,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        borderColor: '#db4437',
                        bgcolor: 'rgba(219, 68, 55, 0.08)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(219, 68, 55, 0.2)',
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
                      borderRadius: 3,
                      py: 2,
                      borderColor: '#333',
                      color: '#333',
                      fontWeight: 600,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        borderColor: '#333',
                        bgcolor: 'rgba(51, 51, 51, 0.08)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(51, 51, 51, 0.2)',
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
    </Box>

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
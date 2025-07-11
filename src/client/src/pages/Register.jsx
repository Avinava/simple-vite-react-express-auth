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
  LinearProgress,
  Chip,
  Grid,
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  PersonAdd as PersonAddIcon,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SuccessMessage from '../components/SuccessMessage';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain uppercase, lowercase, number and special character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const Register = () => {
  const { register: registerUser, error, successMessage, clearMessages } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [passwordStrength, setPasswordStrength] = React.useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchPassword = watch('password', '');

  React.useEffect(() => {
    if (successMessage) {
      setShowSuccess(true);
    }
  }, [successMessage]);

  React.useEffect(() => {
    // Calculate password strength
    let strength = 0;
    if (watchPassword.length >= 8) strength += 25;
    if (/[A-Z]/.test(watchPassword)) strength += 25;
    if (/[a-z]/.test(watchPassword)) strength += 25;
    if (/\d/.test(watchPassword)) strength += 12.5;
    if (/[@$!%*?&]/.test(watchPassword)) strength += 12.5;
    setPasswordStrength(strength);
  }, [watchPassword]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { confirmPassword, ...userData } = data;
      await registerUser(userData);
      // Success message will be shown via useEffect
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    clearMessages();
    navigate('/login');
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return 'error';
    if (passwordStrength < 75) return 'warning';
    return 'success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Very Weak';
    if (passwordStrength < 50) return 'Weak';
    if (passwordStrength < 75) return 'Good';
    if (passwordStrength < 100) return 'Strong';
    return 'Very Strong';
  };


  return (
    <>
      <Container component="main" maxWidth="md">
        <Fade in timeout={800}>
          <Box
            sx={{
              marginTop: 6,
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
                    bgcolor: 'success.main',
                    color: '#ffffff',
                    mb: 2,
                  }}
                >
                  <PersonAddIcon sx={{ fontSize: 32 }} />
                </Box>
                <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
                  Create Account
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Join thousands of users building amazing things
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
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      autoComplete="given-name"
                      autoFocus
                      {...register('firstName')}
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      {...register('lastName')}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>
                </Grid>
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                  autoComplete="new-password"
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
                
                {watchPassword && (
                  <Box sx={{ mt: 1, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Password Strength:
                      </Typography>
                      <Chip 
                        label={getPasswordStrengthText()} 
                        size="small" 
                        color={getPasswordStrengthColor()}
                        variant="outlined"
                      />
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={passwordStrength} 
                      color={getPasswordStrengthColor()}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                )}
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="new-password"
                  {...register('confirmPassword')}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                    background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
                    boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                  }}
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2">
                    Already have an account?{' '}
                    <Link 
                      component={RouterLink} 
                      to="/login"
                      sx={{ 
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      Sign in
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
        title="Account Created!"
        message={successMessage}
        icon="register"
        actionText="Go to Sign In"
        onAction={() => navigate('/login')}
      />
    </>
  );
};

export default Register;
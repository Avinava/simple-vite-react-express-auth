import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Alert,
  Snackbar,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { usersAPI } from '../utils/api';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const Profile = () => {
  const { user, checkAuth } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    },
  });

  React.useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');
      
      await usersAPI.updateUser(user.id, data);
      await checkAuth(); // Refresh user data
      setSuccess(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile Settings
      </Typography>
      
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="First Name"
              {...register('firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              fullWidth
              label="Last Name"
              {...register('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Box>
          
          <TextField
            fullWidth
            label="Email Address"
            sx={{ mb: 2 }}
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        message="Profile updated successfully!"
      />
    </Box>
  );
};

export default Profile;
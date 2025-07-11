import React from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { authAPI } from '../utils/api';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const token = searchParams.get('token');

  React.useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError('Invalid verification token');
        setLoading(false);
        return;
      }

      try {
        await authAPI.verifyEmail(token);
        setSuccess(true);
      } catch (error) {
        setError(error.response?.data?.message || 'Email verification failed');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  if (loading) {
    return (
      <Container component="main" maxWidth="sm">
        <Box sx={{ marginTop: 8, textAlign: 'center' }}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="h6">
              Verifying your email...
            </Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

  if (success) {
    return (
      <Container component="main" maxWidth="sm">
        <Box sx={{ marginTop: 8, textAlign: 'center' }}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom color="primary">
              Email Verified!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Your email has been successfully verified. You can now sign in to your account.
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/login"
            >
              Sign In
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom color="error">
            Verification Failed
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {error || 'Email verification failed. The link may be invalid or expired.'}
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/login"
          >
            Back to Sign In
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default VerifyEmail;
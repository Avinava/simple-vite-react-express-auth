import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Alert,
  Fade,
  useTheme,
  alpha,
} from '@mui/material';
import { Email, Send } from '@mui/icons-material';

const NewsletterSection = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      setEmail('');
    }, 1000);
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Fade in timeout={800}>
            <Box>
              <Typography 
                variant="h3" 
                fontWeight="bold" 
                gutterBottom
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Stay Updated
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ 
                  mb: 4,
                  maxWidth: '500px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Get the latest updates, tips, and exclusive content delivered to your inbox
              </Typography>

              {subscribed ? (
                <Fade in>
                  <Alert 
                    severity="success" 
                    sx={{ 
                      maxWidth: 400, 
                      mx: 'auto',
                      borderRadius: 2,
                    }}
                  >
                    Thank you for subscribing! Check your email for confirmation.
                  </Alert>
                </Fade>
              ) : (
                <Box
                  component="form"
                  onSubmit={handleSubscribe}
                  sx={{
                    display: 'flex',
                    gap: 2,
                    maxWidth: 400,
                    mx: 'auto',
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Enter your email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.background.paper, 0.8),
                        '&:hover': {
                          bgcolor: theme.palette.background.paper,
                        },
                        '&.Mui-focused': {
                          bgcolor: theme.palette.background.paper,
                        },
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    endIcon={<Send />}
                    sx={{
                      px: 4,
                      borderRadius: 2,
                      whiteSpace: 'nowrap',
                      fontWeight: 600,
                      boxShadow: theme.shadows[4],
                      '&:hover': {
                        boxShadow: theme.shadows[8],
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </Box>
              )}

              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mt: 2, opacity: 0.7 }}
              >
                No spam, unsubscribe at any time
              </Typography>
            </Box>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
};

export default NewsletterSection;
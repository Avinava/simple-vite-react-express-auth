import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
  Paper,
  Chip,
  useTheme,
  alpha,
  Fade,
} from '@mui/material';
import { TrendingUp } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const HeroSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
          `,
          animation: 'float 6s ease-in-out infinite',
        },
        '@keyframes float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade in timeout={800}>
              <Box>
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2,
                    mb: 3,
                  }}
                >
                  Build Auth-Ready Apps
                  <br />
                  <Box component="span" sx={{ color: theme.palette.warning.main }}>
                    10x Faster
                  </Box>
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 4, 
                    opacity: 0.9, 
                    fontWeight: 300,
                    maxWidth: '500px',
                    lineHeight: 1.4,
                  }}
                >
                  Production-ready authentication starter with Vite, React, Express, and PostgreSQL. 
                  Complete user management system - start building features, not auth boilerplate.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: '#ffffff',
                      color: theme.palette.primary.main,
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      borderRadius: 2,
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                      '&:hover': {
                        bgcolor: alpha('#ffffff', 0.9),
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.16)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Get Started Free
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: '#ffffff',
                      color: '#ffffff',
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      borderRadius: 2,
                      borderWidth: 2,
                      '&:hover': {
                        borderColor: '#ffffff',
                        bgcolor: alpha('#ffffff', 0.1),
                        transform: 'translateY(-2px)',
                        borderWidth: 2,
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Sign In
                  </Button>
                </Stack>
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} md={6}>
            <Fade in timeout={1200}>
              <Box
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -20,
                    left: -20,
                    right: 20,
                    bottom: 20,
                    background: alpha('#ffffff', 0.1),
                    borderRadius: 3,
                    transform: 'rotate(3deg)',
                  },
                }}
              >
                <Paper
                  elevation={24}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    position: 'relative',
                    bgcolor: alpha('#ffffff', 0.95),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha('#ffffff', 0.2)}`,
                  }}
                >
                  <Typography variant="h6" gutterBottom color="text.primary" fontWeight="bold">
                    Dashboard Preview
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip label="React 18" size="small" color="primary" />
                    <Chip label="Material-UI" size="small" color="secondary" />
                    <Chip label="Node.js" size="small" color="success" />
                    <Chip label="PostgreSQL" size="small" color="info" />
                  </Box>
                  <Box 
                    sx={{ 
                      height: 200, 
                      bgcolor: alpha(theme.palette.primary.main, 0.1), 
                      borderRadius: 2, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      border: `2px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
                    }}
                  >
                    <TrendingUp sx={{ fontSize: 60, color: theme.palette.primary.main }} />
                  </Box>
                </Paper>
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
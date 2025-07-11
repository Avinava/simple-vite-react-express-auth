import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useScrollTrigger,
  Slide,
  alpha,
  useTheme,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const { user } = useAuth();
  const location = useLocation();
  const theme = useTheme();
  
  const isLandingPage = location.pathname === '/';

  return (
    <HideOnScroll>
      <AppBar 
        position="fixed" 
        sx={{ 
          bgcolor: isLandingPage ? alpha('#ffffff', 0.95) : 'primary.main',
          backdropFilter: isLandingPage ? 'blur(10px)' : 'none',
          boxShadow: isLandingPage ? 1 : 3,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography 
                variant="h5" 
                component={RouterLink}
                to="/"
                sx={{ 
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  color: isLandingPage ? 'primary.main' : '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                🚀 SaaS Starter
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {!user ? (
                <>
                  <Button 
                    component={RouterLink} 
                    to="/login"
                    sx={{ 
                      color: isLandingPage ? 'text.primary' : '#ffffff',
                      '&:hover': {
                        bgcolor: alpha(isLandingPage ? theme.palette.primary.main : '#ffffff', 0.1),
                      },
                    }}
                  >
                    Sign In
                  </Button>
                  <Button 
                    component={RouterLink} 
                    to="/register"
                    variant={isLandingPage ? 'contained' : 'outlined'}
                    sx={isLandingPage ? {} : {
                      borderColor: '#ffffff',
                      color: '#ffffff',
                      '&:hover': {
                        borderColor: '#ffffff',
                        bgcolor: alpha('#ffffff', 0.1),
                      },
                    }}
                  >
                    Get Started
                  </Button>
                </>
              ) : (
                <Button 
                  component={RouterLink} 
                  to="/home"
                  variant="contained"
                  sx={isLandingPage ? {} : {
                    bgcolor: '#ffffff',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: alpha('#ffffff', 0.9),
                    },
                  }}
                >
                  Go to App
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
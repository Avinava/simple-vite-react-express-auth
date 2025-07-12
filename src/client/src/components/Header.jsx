import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container, alpha, useTheme, Chip, IconButton, Menu, MenuItem } from "@mui/material";
import { Rocket, Menu as MenuIcon, Close as CloseIcon, ArrowForward } from "@mui/icons-material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { user } = useAuth();
  const location = useLocation();
  const theme = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isLandingPage = location.pathname === "/";

  const navigationItems = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: alpha(theme.palette.background.paper, 0.95),
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
        boxShadow: theme.palette.mode === 'dark' 
          ? "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)"
          : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        borderRadius: "0 0 0px 0px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            py: 1.5,
            minHeight: "80px",
            px: { xs: 2, sm: 3 },
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#ffffff",
                  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                }}
              >
                <Rocket sx={{ fontSize: 20 }} />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "text.primary",
                  fontSize: "1.5rem",
                  letterSpacing: "-0.02em",
                }}
              >
                SaaS Starter
              </Typography>
              <Chip
                label="Beta"
                size="small"
                sx={{
                  bgcolor: "primary.main",
                  color: "#ffffff",
                  fontSize: "0.65rem",
                  height: 20,
                  fontWeight: 600,
                }}
              />
            </Box>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
            {isLandingPage &&
              navigationItems.map((item) => (
                <Button
                  key={item.label}
                  href={item.href}
                  sx={{
                    color: "text.secondary",
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      color: "primary.main",
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
          </Box>

          {/* Desktop Auth Buttons */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
            <ThemeToggle size="small" />
            {!user ? (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="text"
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      color: "primary.main",
                    },
                  }}
                >
                  Sign In
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                  sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                    px: 3,
                    py: 1.2,
                    borderRadius: 2,
                    fontWeight: 600,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
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
                endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                sx={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                  px: 3,
                  py: 1.2,
                  borderRadius: 2,
                  fontWeight: 600,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
                  },
                }}
              >
                Go to App
              </Button>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1 }}>
            <ThemeToggle size="small" />
            <IconButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              sx={{
                color: "text.primary",
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.12),
                },
              }}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Toolbar>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              bgcolor: "background.paper",
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
              py: 3,
              px: 2,
            }}
          >
            {isLandingPage &&
              navigationItems.map((item) => (
                <Button
                  key={item.label}
                  href={item.href}
                  fullWidth
                  sx={{
                    justifyContent: "flex-start",
                    color: "text.secondary",
                    fontWeight: 500,
                    py: 1.5,
                    mb: 1,
                    borderRadius: 2,
                    "&:hover": {
                      color: "primary.main",
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Button>
              ))}

            <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
              {!user ? (
                <>
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="outlined"
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    fullWidth
                    sx={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Button>
                </>
              ) : (
                <Button
                  component={RouterLink}
                  to="/home"
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Go to App
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Container>
    </AppBar>
  );
};

export default Header;

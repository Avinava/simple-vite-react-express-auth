import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Twitter,
  LinkedIn,
  GitHub,
  Email,
  Phone,
  LocationOn,
  Rocket,
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();

  const footerLinks = {
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'API Documentation', href: '#docs' },
      { name: 'Integrations', href: '#integrations' },
    ],
    Company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Blog', href: '#blog' },
      { name: 'Press Kit', href: '#press' },
    ],
    Support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'Status Page', href: '#status' },
      { name: 'Community', href: '#community' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: LinkedIn, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: GitHub, href: 'https://github.com', label: 'GitHub' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.900',
        color: '#ffffff',
        pt: 8,
        pb: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    p: 1,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    color: '#ffffff',
                    mr: 2,
                  }}
                >
                  <Rocket sx={{ fontSize: 24 }} />
                </Box>
                <Typography variant="h5" fontWeight="bold">
                  SaaS Starter
                </Typography>
              </Box>
              <Typography variant="body1" color="grey.300" sx={{ mb: 3, maxWidth: 300 }}>
                Build amazing SaaS applications with our modern, scalable starter kit. 
                Everything you need to launch your next big idea.
              </Typography>
              
              {/* Contact Info */}
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ fontSize: 16, color: 'grey.400' }} />
                  <Typography variant="body2" color="grey.300">
                    hello@saasStarter.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone sx={{ fontSize: 16, color: 'grey.400' }} />
                  <Typography variant="body2" color="grey.300">
                    +1 (555) 123-4567
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ fontSize: 16, color: 'grey.400' }} />
                  <Typography variant="body2" color="grey.300">
                    San Francisco, CA
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid item xs={6} sm={3} md={2} key={category}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: '#ffffff' }}>
                {category}
              </Typography>
              <Stack spacing={1}>
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    color="grey.300"
                    underline="none"
                    sx={{
                      fontSize: '0.875rem',
                      transition: 'color 0.2s',
                      '&:hover': {
                        color: 'primary.light',
                      },
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: 'grey.700', mb: 4 }} />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="grey.400">
            © {new Date().getFullYear()} SaaS Starter. All rights reserved.
          </Typography>

          {/* Social Links */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'grey.400',
                  '&:hover': {
                    color: 'primary.light',
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                <social.icon sx={{ fontSize: 20 }} />
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
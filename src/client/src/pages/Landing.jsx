import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
  Paper,
  useTheme,
  alpha,
} from '@mui/material';
import {
  RocketLaunch,
  Security,
  Speed,
  CloudDone,
  Star,
  CheckCircle,
  TrendingUp,
  People,
  Code,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import Header from '../components/Header';

const features = [
  {
    icon: <RocketLaunch />,
    title: 'Quick Start',
    description: 'Get your SaaS up and running in minutes with our pre-built authentication and user management.',
  },
  {
    icon: <Security />,
    title: 'Enterprise Security',
    description: 'JWT authentication, password hashing, rate limiting, and security best practices built-in.',
  },
  {
    icon: <Speed />,
    title: 'High Performance',
    description: 'Built with React 18, Vite, and modern Node.js for lightning-fast development and runtime.',
  },
  {
    icon: <CloudDone />,
    title: 'Production Ready',
    description: 'Includes testing, linting, error handling, and deployment configurations out of the box.',
  },
  {
    icon: <Code />,
    title: 'Modern Stack',
    description: 'PostgreSQL, Prisma ORM, Material-UI, and ES modules throughout the entire codebase.',
  },
  {
    icon: <People />,
    title: 'User Management',
    description: 'Complete user lifecycle with registration, email verification, password reset, and profiles.',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, TechStart',
    avatar: 'SC',
    rating: 5,
    comment: 'This starter kit saved us months of development time. The code quality is exceptional.',
  },
  {
    name: 'Mike Rodriguez',
    role: 'Full Stack Developer',
    avatar: 'MR',
    rating: 5,
    comment: 'Clean architecture, great documentation, and modern best practices. Highly recommended!',
  },
  {
    name: 'Emily Johnson',
    role: 'Product Manager',
    avatar: 'EJ',
    rating: 5,
    comment: 'Perfect foundation for our SaaS product. The UI components are beautiful and responsive.',
  },
];

const stats = [
  { number: '10k+', label: 'Developers' },
  { number: '500+', label: 'Projects Built' },
  { number: '99.9%', label: 'Uptime' },
  { number: '24/7', label: 'Support' },
];

const Landing = () => {
  const theme = useTheme();

  return (
    <Box>
      <Header />
      
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                }}
              >
                Build Your SaaS
                <br />
                <Box component="span" sx={{ color: theme.palette.warning.main }}>
                  10x Faster
                </Box>
              </Typography>
              <Typography
                variant="h5"
                sx={{ mb: 4, opacity: 0.9, fontWeight: 300 }}
              >
                Production-ready starter kit with authentication, user management,
                and modern UI components. Start building features, not boilerplate.
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
                    '&:hover': {
                      bgcolor: alpha('#ffffff', 0.9),
                    },
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
                    '&:hover': {
                      borderColor: '#ffffff',
                      bgcolor: alpha('#ffffff', 0.1),
                    },
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
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
                  }}
                >
                  <Typography variant="h6" gutterBottom color="text.primary">
                    Dashboard Preview
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip label="React 18" size="small" color="primary" />
                    <Chip label="Material-UI" size="small" color="secondary" />
                    <Chip label="Node.js" size="small" color="success" />
                  </Box>
                  <Box sx={{ height: 200, bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TrendingUp sx={{ fontSize: 60, color: theme.palette.primary.main }} />
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 6, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box textAlign="center">
                  <Typography variant="h3" component="div" color="primary" fontWeight="bold">
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
              Everything You Need
            </Typography>
            <Typography variant="h6" color="text.secondary" maxWidth="600px" mx="auto">
              A complete foundation for your SaaS application with modern tools and best practices
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        p: 2,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        mb: 2,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
              Loved by Developers
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Join thousands of developers building amazing SaaS products
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} sx={{ color: 'warning.main', fontSize: 20 }} />
                      ))}
                    </Box>
                    <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                      "{testimonial.comment}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 8,
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: 'white',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
            Ready to Build Something Amazing?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of developers who chose our starter kit to build their SaaS products
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
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
                '&:hover': {
                  bgcolor: alpha('#ffffff', 0.9),
                },
              }}
            >
              Start Building Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#ffffff',
                color: '#ffffff',
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: '#ffffff',
                  bgcolor: alpha('#ffffff', 0.1),
                },
              }}
            >
              View Documentation
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
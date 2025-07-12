import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
  Fade,
} from '@mui/material';
import {
  RocketLaunch,
  Security,
  Speed,
  CloudDone,
  Code,
  People,
} from '@mui/icons-material';

const features = [
  {
    icon: <RocketLaunch />,
    title: 'Quick Start',
    description: 'Get your app up and running in minutes with pre-built authentication, user management, and modern tooling.',
    color: 'primary.main',
  },
  {
    icon: <Security />,
    title: 'Enterprise Security',
    description: 'JWT authentication, password hashing, rate limiting, and security best practices built-in.',
    color: 'success.main',
  },
  {
    icon: <Speed />,
    title: 'High Performance',
    description: 'Built with React 18, Vite, and modern Node.js for lightning-fast development and runtime.',
    color: 'warning.main',
  },
  {
    icon: <CloudDone />,
    title: 'Production Ready',
    description: 'Includes testing, linting, error handling, and deployment configurations out of the box.',
    color: 'info.main',
  },
  {
    icon: <Code />,
    title: 'Modern Stack',
    description: 'PostgreSQL, Prisma ORM, Material-UI, and ES modules throughout the entire codebase.',
    color: 'secondary.main',
  },
  {
    icon: <People />,
    title: 'User Management',
    description: 'Complete user lifecycle with registration, email verification, password reset, and profiles.',
    color: 'error.main',
  },
];

const FeaturesSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            fontWeight="bold"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Everything You Need
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            maxWidth="600px" 
            mx="auto"
            sx={{ lineHeight: 1.6 }}
          >
            A complete authentication foundation for your web application with modern tools and best practices
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Fade in timeout={600 + index * 100}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[12],
                      borderColor: feature.color,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        p: 2,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette[feature.color.split('.')[0]].main, 0.1),
                        color: feature.color,
                        mb: 2,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Fade,
  useTheme,
} from '@mui/material';
import {
  TrendingUp,
  People as Users,
  Support,
  Storage as Database,
} from '@mui/icons-material';
import AnimatedCounter from '../AnimatedCounter';

const stats = [
  { number: '10K+', label: 'Active Users', icon: Users, color: 'primary.main' },
  { number: '99.9%', label: 'Uptime', icon: TrendingUp, color: 'success.main' },
  { number: '24/7', label: 'Support', icon: Support, color: 'warning.main' },
  { number: '50+', label: 'Integrations', icon: Database, color: 'info.main' },
];

const StatsSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={stat.label}>
              <Fade in timeout={800 + index * 200}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: '50%',
                      bgcolor: stat.color,
                      color: '#ffffff',
                      mb: 2,
                      boxShadow: theme.shadows[4],
                    }}
                  >
                    <stat.icon sx={{ fontSize: 32 }} />
                  </Box>
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
                    <AnimatedCounter end={stat.number} />
                  </Typography>
                  <Typography variant="h6" color="text.secondary" fontWeight="medium">
                    {stat.label}
                  </Typography>
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StatsSection;
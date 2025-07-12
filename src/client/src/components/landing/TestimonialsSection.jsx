import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  useTheme,
  Fade,
} from '@mui/material';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, TechStart',
    avatar: 'SC',
    rating: 5,
    comment: 'This starter kit saved us months of development time. The code quality is exceptional and the architecture is solid.',
  },
  {
    name: 'Mike Rodriguez',
    role: 'Full Stack Developer',
    avatar: 'MR',
    rating: 5,
    comment: 'Clean architecture, great documentation, and modern best practices. Highly recommended for any SaaS project!',
  },
  {
    name: 'Emily Johnson',
    role: 'Product Manager',
    avatar: 'EJ',
    rating: 5,
    comment: 'Perfect foundation for our SaaS product. The UI components are beautiful and responsive across all devices.',
  },
];

const TestimonialsSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
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
            Loved by Developers
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Join thousands of developers building amazing SaaS products
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={testimonial.name}>
              <Fade in timeout={1000 + index * 200}>
                <Card
                  sx={{
                    height: '100%',
                    p: 3,
                    transition: 'all 0.3s ease',
                    border: `1px solid ${theme.palette.divider}`,
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar
                        sx={{
                          bgcolor: 'primary.main',
                          mr: 2,
                          width: 48,
                          height: 48,
                          fontWeight: 'bold',
                        }}
                      >
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Rating 
                      value={testimonial.rating} 
                      readOnly 
                      sx={{ mb: 2 }}
                      size="small"
                    />
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ 
                        fontStyle: 'italic',
                        lineHeight: 1.6,
                        '&::before': { content: '"' },
                        '&::after': { content: '"' },
                      }}
                    >
                      {testimonial.comment}
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

export default TestimonialsSection;
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Fade,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const faqs = [
  {
    question: 'What technologies are included?',
    answer: 'Our auth starter includes Vite, React 18, Express, PostgreSQL, Prisma ORM, Material-UI, JWT authentication, and more. Everything is configured with modern best practices.',
  },
  {
    question: 'Is it suitable for production?',
    answer: 'Absolutely! The code follows production best practices with proper error handling, security measures, scalable architecture, and comprehensive testing setup.',
  },
  {
    question: 'Do you provide support?',
    answer: 'Yes, we offer comprehensive documentation, video tutorials, and email support to help you get started quickly and resolve any issues.',
  },
  {
    question: 'Can I customize the design?',
    answer: 'Yes, the entire UI is built with Material-UI components and can be easily customized to match your brand. The theme system makes it simple to change colors, fonts, and styling.',
  },
  {
    question: 'What about updates?',
    answer: 'We regularly update the auth starter with new features, security patches, and the latest versions of dependencies to keep your project current.',
  },
  {
    question: 'Is there a money-back guarantee?',
    answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied with the starter kit, we\'ll provide a full refund, no questions asked.',
  },
];

const FAQSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
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
            Frequently Asked Questions
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Everything you need to know about our platform
          </Typography>
        </Box>

        {faqs.map((faq, index) => (
          <Fade in timeout={800 + index * 100} key={faq.question}>
            <Accordion
              sx={{
                mb: 2,
                '&:before': { display: 'none' },
                boxShadow: 1,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                '&:hover': {
                  boxShadow: theme.shadows[4],
                },
                '&.Mui-expanded': {
                  boxShadow: theme.shadows[4],
                  borderColor: 'primary.main',
                },
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMore />}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    my: 2,
                  },
                }}
              >
                <Typography variant="h6" fontWeight="medium">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Fade>
        ))}
      </Container>
    </Box>
  );
};

export default FAQSection;
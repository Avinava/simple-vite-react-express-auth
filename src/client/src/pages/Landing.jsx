import React from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  TestimonialsSection,
  CTASection,
  FAQSection,
  NewsletterSection,
} from "../components/landing";

const Landing = () => {
  return (
    <Box>
      <Header />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
      <NewsletterSection />
      <Footer />
    </Box>
  );
};

export default Landing;

import React, { useState, useEffect } from 'react';

const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Extract numeric value from string like "10K+" or "99.9%"
    const numericValue = parseFloat(end.toString().replace(/[^\d.]/g, ''));
    
    if (isNaN(numericValue)) {
      setCount(end);
      return;
    }

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = easeOutQuart * numericValue;
      
      // Format the number based on the original format
      if (end.includes('K')) {
        setCount(Math.floor(currentCount) + 'K+');
      } else if (end.includes('%')) {
        setCount(currentCount.toFixed(1) + '%');
      } else if (end.includes('/')) {
        setCount(end); // For cases like "24/7"
      } else {
        setCount(Math.floor(currentCount) + '+');
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
};

export default AnimatedCounter;
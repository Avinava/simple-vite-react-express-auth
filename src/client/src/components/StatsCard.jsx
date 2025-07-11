import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  useTheme,
  alpha,
  Grow,
} from '@mui/material';
import {
  ArrowUpward,
  ArrowDownward,
  MoreVert,
} from '@mui/icons-material';

const StatsCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  color, 
  bgColor,
  index = 0 
}) => {
  const theme = useTheme();

  return (
    <Grow in timeout={800 + index * 200}>
      <Card 
        sx={{ 
          height: '100%',
          background: `linear-gradient(135deg, ${bgColor} 0%, ${alpha(color, 0.05)} 100%)`,
          border: `1px solid ${alpha(color, 0.2)}`,
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8],
          }
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: color,
                color: '#ffffff',
              }}
            >
              <Icon />
            </Box>
            <IconButton size="small">
              <MoreVert />
            </IconButton>
          </Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {trend === 'up' ? (
              <ArrowUpward sx={{ color: 'success.main', fontSize: 16 }} />
            ) : (
              <ArrowDownward sx={{ color: 'error.main', fontSize: 16 }} />
            )}
            <Typography 
              variant="caption" 
              sx={{ 
                color: trend === 'up' ? 'success.main' : 'error.main',
                fontWeight: 'bold'
              }}
            >
              {change}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              vs last month
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grow>
  );
};

export default StatsCard;
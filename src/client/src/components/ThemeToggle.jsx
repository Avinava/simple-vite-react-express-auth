import React from 'react';
import { IconButton, Tooltip, useTheme as useMuiTheme } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ size = 'medium', ...props }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <Tooltip title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton
        onClick={toggleDarkMode}
        size={size}
        sx={{
          color: 'text.primary',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'action.hover',
            transform: 'scale(1.1)',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        }}
        {...props}
      >
        {darkMode ? (
          <LightMode sx={{ fontSize: size === 'small' ? 20 : size === 'large' ? 32 : 24 }} />
        ) : (
          <DarkMode sx={{ fontSize: size === 'small' ? 20 : size === 'large' ? 32 : 24 }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
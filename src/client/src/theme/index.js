import { createTheme } from '@mui/material/styles';

// Modern color palette
const colors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  secondary: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

// Base typography configuration
const typography = {
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  h1: {
    fontWeight: 800,
    fontSize: '3rem',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontWeight: 700,
    fontSize: '2.25rem',
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontWeight: 700,
    fontSize: '1.875rem',
    lineHeight: 1.4,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.4,
  },
  h5: {
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.5,
  },
  h6: {
    fontWeight: 600,
    fontSize: '1.125rem',
    lineHeight: 1.5,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
  },
  button: {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.875rem',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.4,
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    lineHeight: 1.4,
  },
};

// Component overrides
const getComponents = (mode) => ({
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        scrollBehavior: 'smooth',
        backgroundColor: mode === 'dark' ? colors.gray[900] : colors.gray[50],
      },
      '#root': {
        backgroundColor: mode === 'dark' ? colors.gray[900] : colors.gray[50],
        color: mode === 'dark' ? colors.gray[100] : colors.gray[900],
        minHeight: '100vh',
      },
      body: {
        fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
        backgroundColor: mode === 'dark' ? colors.gray[900] : colors.gray[50],
        color: mode === 'dark' ? colors.gray[100] : colors.gray[900],
      },
      '*': {
        boxSizing: 'border-box',
      },
      '*::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '*::-webkit-scrollbar-track': {
        background: mode === 'dark' ? colors.gray[800] : colors.gray[100],
      },
      '*::-webkit-scrollbar-thumb': {
        background: mode === 'dark' ? colors.gray[600] : colors.gray[400],
        borderRadius: '4px',
      },
      '*::-webkit-scrollbar-thumb:hover': {
        background: mode === 'dark' ? colors.gray[500] : colors.gray[500],
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        padding: '12px 24px',
        fontSize: '0.875rem',
        fontWeight: 600,
        textTransform: 'none',
        boxShadow: 'none',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: mode === 'dark' 
            ? '0 8px 25px rgba(0, 0, 0, 0.4)' 
            : '0 8px 25px rgba(0, 0, 0, 0.15)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
      },
      contained: {
        '&:hover': {
          boxShadow: mode === 'dark' 
            ? '0 12px 35px rgba(0, 0, 0, 0.5)' 
            : '0 12px 35px rgba(0, 0, 0, 0.2)',
        },
      },
      outlined: {
        borderWidth: '2px',
        '&:hover': {
          borderWidth: '2px',
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 20,
        boxShadow: mode === 'dark' 
          ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
          : '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: mode === 'dark' 
            ? '0 12px 40px rgba(0, 0, 0, 0.4)' 
            : '0 12px 40px rgba(0, 0, 0, 0.15)',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        backgroundImage: 'none',
      },
      elevation1: {
        boxShadow: mode === 'dark' 
          ? '0 2px 8px rgba(0, 0, 0, 0.3)' 
          : '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 12,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: '2px',
            },
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: '2px',
            },
          },
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        fontWeight: 500,
        fontSize: '0.8125rem',
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        borderBottom: mode === 'dark' 
          ? `1px solid ${colors.gray[700]}` 
          : `1px solid ${colors.gray[200]}`,
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRight: mode === 'dark' 
          ? `1px solid ${colors.gray[700]}` 
          : `1px solid ${colors.gray[200]}`,
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: mode === 'dark' ? colors.gray[700] : colors.gray[200],
      },
    },
  },
});

// Theme creation function
export const getTheme = (mode = 'light') => {
  const isDark = mode === 'dark';
  
  return createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primary[600],
        light: colors.primary[400],
        dark: colors.primary[700],
        contrastText: '#ffffff',
        50: colors.primary[50],
        100: colors.primary[100],
        200: colors.primary[200],
        300: colors.primary[300],
        400: colors.primary[400],
        500: colors.primary[500],
        600: colors.primary[600],
        700: colors.primary[700],
        800: colors.primary[800],
        900: colors.primary[900],
      },
      secondary: {
        main: colors.secondary[600],
        light: colors.secondary[400],
        dark: colors.secondary[700],
        contrastText: '#ffffff',
        50: colors.secondary[50],
        100: colors.secondary[100],
        200: colors.secondary[200],
        300: colors.secondary[300],
        400: colors.secondary[400],
        500: colors.secondary[500],
        600: colors.secondary[600],
        700: colors.secondary[700],
        800: colors.secondary[800],
        900: colors.secondary[900],
      },
      success: {
        main: colors.success[600],
        light: colors.success[400],
        dark: colors.success[700],
        contrastText: '#ffffff',
      },
      warning: {
        main: colors.warning[500],
        light: colors.warning[400],
        dark: colors.warning[600],
        contrastText: '#ffffff',
      },
      error: {
        main: colors.error[500],
        light: colors.error[400],
        dark: colors.error[600],
        contrastText: '#ffffff',
      },
      info: {
        main: colors.primary[500],
        light: colors.primary[400],
        dark: colors.primary[600],
        contrastText: '#ffffff',
      },
      background: {
        default: isDark ? colors.gray[900] : colors.gray[50],
        paper: isDark ? colors.gray[800] : '#ffffff',
      },
      text: {
        primary: isDark ? colors.gray[100] : colors.gray[900],
        secondary: isDark ? colors.gray[400] : colors.gray[600],
        disabled: isDark ? colors.gray[600] : colors.gray[400],
      },
      divider: isDark ? colors.gray[700] : colors.gray[200],
      action: {
        hover: isDark ? colors.gray[800] : colors.gray[100],
        selected: isDark ? colors.gray[700] : colors.gray[200],
        disabled: isDark ? colors.gray[600] : colors.gray[400],
        disabledBackground: isDark ? colors.gray[800] : colors.gray[100],
      },
    },
    typography,
    shape: {
      borderRadius: 12,
    },
    components: getComponents(mode),
    shadows: isDark ? [
      'none',
      '0px 2px 4px rgba(0,0,0,0.3)',
      '0px 4px 8px rgba(0,0,0,0.3)',
      '0px 8px 16px rgba(0,0,0,0.3)',
      '0px 12px 24px rgba(0,0,0,0.3)',
      '0px 16px 32px rgba(0,0,0,0.3)',
      '0px 20px 40px rgba(0,0,0,0.3)',
      '0px 24px 48px rgba(0,0,0,0.3)',
      '0px 28px 56px rgba(0,0,0,0.3)',
      '0px 32px 64px rgba(0,0,0,0.3)',
      '0px 36px 72px rgba(0,0,0,0.3)',
      '0px 40px 80px rgba(0,0,0,0.3)',
      '0px 44px 88px rgba(0,0,0,0.3)',
      '0px 48px 96px rgba(0,0,0,0.3)',
      '0px 52px 104px rgba(0,0,0,0.3)',
      '0px 56px 112px rgba(0,0,0,0.3)',
      '0px 60px 120px rgba(0,0,0,0.3)',
      '0px 64px 128px rgba(0,0,0,0.3)',
      '0px 68px 136px rgba(0,0,0,0.3)',
      '0px 72px 144px rgba(0,0,0,0.3)',
      '0px 76px 152px rgba(0,0,0,0.3)',
      '0px 80px 160px rgba(0,0,0,0.3)',
      '0px 84px 168px rgba(0,0,0,0.3)',
      '0px 88px 176px rgba(0,0,0,0.3)',
      '0px 92px 184px rgba(0,0,0,0.3)',
    ] : [
      'none',
      '0px 2px 4px rgba(0,0,0,0.05)',
      '0px 4px 8px rgba(0,0,0,0.05)',
      '0px 8px 16px rgba(0,0,0,0.05)',
      '0px 12px 24px rgba(0,0,0,0.05)',
      '0px 16px 32px rgba(0,0,0,0.05)',
      '0px 20px 40px rgba(0,0,0,0.05)',
      '0px 24px 48px rgba(0,0,0,0.05)',
      '0px 28px 56px rgba(0,0,0,0.05)',
      '0px 32px 64px rgba(0,0,0,0.05)',
      '0px 36px 72px rgba(0,0,0,0.05)',
      '0px 40px 80px rgba(0,0,0,0.05)',
      '0px 44px 88px rgba(0,0,0,0.05)',
      '0px 48px 96px rgba(0,0,0,0.05)',
      '0px 52px 104px rgba(0,0,0,0.05)',
      '0px 56px 112px rgba(0,0,0,0.05)',
      '0px 60px 120px rgba(0,0,0,0.05)',
      '0px 64px 128px rgba(0,0,0,0.05)',
      '0px 68px 136px rgba(0,0,0,0.05)',
      '0px 72px 144px rgba(0,0,0,0.05)',
      '0px 76px 152px rgba(0,0,0,0.05)',
      '0px 80px 160px rgba(0,0,0,0.05)',
      '0px 84px 168px rgba(0,0,0,0.05)',
      '0px 88px 176px rgba(0,0,0,0.05)',
      '0px 92px 184px rgba(0,0,0,0.05)',
    ],
  });
};

// Export default light theme for backward compatibility
export default getTheme('light');
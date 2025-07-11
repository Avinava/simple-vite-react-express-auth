import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Fade,
  useTheme,
} from '@mui/material';
import {
  CheckCircle,
  Email,
  Login,
  PersonAdd,
} from '@mui/icons-material';

const iconMap = {
  success: CheckCircle,
  email: Email,
  login: Login,
  register: PersonAdd,
};

const SuccessMessage = ({ 
  open, 
  onClose, 
  title, 
  message, 
  icon = 'success',
  actionText = 'Continue',
  onAction,
  autoClose = false,
  autoCloseDelay = 3000 
}) => {
  const theme = useTheme();
  const IconComponent = iconMap[icon] || CheckCircle;

  React.useEffect(() => {
    if (autoClose && open) {
      const timer = setTimeout(() => {
        onClose();
        if (onAction) onAction();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoClose, open, autoCloseDelay, onClose, onAction]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
        },
      }}
    >
      <DialogContent sx={{ textAlign: 'center', py: 4 }}>
        <Box
          sx={{
            display: 'inline-flex',
            p: 3,
            borderRadius: '50%',
            bgcolor: theme.palette.success.light,
            color: theme.palette.success.main,
            mb: 3,
          }}
        >
          <IconComponent sx={{ fontSize: 48 }} />
        </Box>
        
        <Typography variant="h4" gutterBottom fontWeight="bold" color="text.primary">
          {title}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
          {message}
        </Typography>
        
        {!autoClose && (
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              onClose();
              if (onAction) onAction();
            }}
            sx={{ px: 4, py: 1.5 }}
          >
            {actionText}
          </Button>
        )}
        
        {autoClose && (
          <Typography variant="caption" color="text.secondary">
            Redirecting automatically...
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SuccessMessage;
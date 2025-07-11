import React from 'react';
import {
  Snackbar,
  Alert,
  Slide,
  Fade,
} from '@mui/material';

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const NotificationToast = ({ 
  open, 
  onClose, 
  message, 
  severity = 'success',
  duration = 4000,
  position = { vertical: 'top', horizontal: 'center' }
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={position}
      TransitionComponent={SlideTransition}
      sx={{ mt: 8 }}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        variant="filled"
        sx={{ 
          width: '100%',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationToast;
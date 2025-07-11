import nodemailer from 'nodemailer';

let transporter;
let emailEnabled = false;

// Check if email is configured
const isEmailConfigured = () => {
  if (process.env.NODE_ENV === 'development') {
    // In development, we can use console logging if no SMTP is configured
    return true;
  }
  
  // In production, require SMTP configuration
  return !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );
};

// Initialize transporter
const initializeTransporter = () => {
  if (!isEmailConfigured()) {
    console.warn('Email not configured. Email features will be disabled.');
    emailEnabled = false;
    return;
  }

  try {
    if (process.env.NODE_ENV === 'development' && !process.env.SMTP_HOST) {
      // Development mode without SMTP - just log emails
      console.log('Development mode: Email will be logged to console');
      emailEnabled = 'console';
      return;
    }

    // Use real SMTP configuration
    transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    emailEnabled = true;
    console.log('Email service initialized successfully');
  } catch (error) {
    console.error('Failed to initialize email service:', error.message);
    emailEnabled = false;
  }
};

export const sendEmail = async ({ to, subject, html, text }) => {
  // Initialize transporter if not already done
  if (emailEnabled === undefined) {
    initializeTransporter();
  }

  // If email is disabled, just log and return
  if (!emailEnabled) {
    console.log('Email sending skipped (not configured)');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    return { messageId: 'email-disabled', info: 'Email service not configured' };
  }

  // If in console mode (development without SMTP), log the email
  if (emailEnabled === 'console') {
    console.log('\n===== EMAIL (Development Mode) =====');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${text || html.replace(/<[^>]*>/g, '')}`);
    console.log('=====================================\n');
    return { messageId: 'console-logged', info: 'Email logged to console' };
  }

  // Send actual email
  try {
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@saas-starter.com',
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, '') // Strip HTML for text version
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log(`Email sent successfully to ${to}`);
    if (process.env.NODE_ENV === 'development') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    return info;
  } catch (error) {
    console.error('Email sending failed:', error.message);
    // Don't throw error - just log it and continue
    return { error: error.message, info: 'Email sending failed but application continues' };
  }
};

// Export helper to check if email is enabled
export const isEmailEnabled = () => {
  if (emailEnabled === undefined) {
    initializeTransporter();
  }
  return !!emailEnabled;
};
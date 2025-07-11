import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '../config/database.js';
import { sendEmail } from './emailService.js';

export class AuthService {
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
  }

  static async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateTokens(userId) {
    const accessToken = jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
    );

    const refreshToken = jwt.sign(
      { userId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
    );

    return { accessToken, refreshToken };
  }

  static async register({ email, password, firstName, lastName }) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Hash password
    const hashedPassword = await this.hashPassword(password);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        verificationToken
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        emailVerified: true,
        createdAt: true
      }
    });

    // Send verification email (if email is configured)
    try {
      await sendEmail({
        to: email,
        subject: 'Verify Your Email',
        html: `
          <h1>Welcome to SaaS Starter!</h1>
          <p>Please click the link below to verify your email:</p>
          <a href="${process.env.CLIENT_URL}/verify-email?token=${verificationToken}">
            Verify Email
          </a>
        `
      });
    } catch (error) {
      console.warn('Failed to send verification email, but user was created successfully');
    }

    return user;
  }

  static async login({ email, password }) {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !user.isActive) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isValidPassword = await this.comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate tokens
    const { accessToken, refreshToken } = this.generateTokens(user.id);

    // Save refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt
      }
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        emailVerified: user.emailVerified
      },
      accessToken,
      refreshToken
    };
  }

  static async refreshToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      
      // Find session
      const session = await prisma.session.findUnique({
        where: { refreshToken },
        include: { user: true }
      });

      if (!session || session.expiresAt < new Date() || !session.user.isActive) {
        throw new Error('Invalid refresh token');
      }

      // Generate new tokens
      const { accessToken, refreshToken: newRefreshToken } = this.generateTokens(session.userId);

      // Update session
      await prisma.session.update({
        where: { id: session.id },
        data: {
          refreshToken: newRefreshToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        }
      });

      return {
        accessToken,
        refreshToken: newRefreshToken
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  static async forgotPassword(email) {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Don't reveal if user exists
      return { message: 'If an account with that email exists, we sent a password reset link.' };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry
      }
    });

    // Send reset email (if email is configured)
    try {
      await sendEmail({
        to: email,
        subject: 'Password Reset',
        html: `
          <h1>Password Reset</h1>
          <p>Click the link below to reset your password:</p>
          <a href="${process.env.CLIENT_URL}/reset-password?token=${resetToken}">
            Reset Password
          </a>
          <p>This link expires in 1 hour.</p>
        `
      });
    } catch (error) {
      console.warn('Failed to send password reset email');
    }

    return { message: 'If an account with that email exists, we sent a password reset link.' };
  }

  static async resetPassword({ token, password }) {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    const hashedPassword = await this.hashPassword(password);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    return { message: 'Password reset successful' };
  }

  static async logout(refreshToken) {
    await prisma.session.deleteMany({
      where: { refreshToken }
    });

    return { message: 'Logged out successfully' };
  }

  static async verifyEmail(token) {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token }
    });

    if (!user) {
      throw new Error('Invalid verification token');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null
      }
    });

    return { message: 'Email verified successfully' };
  }
}
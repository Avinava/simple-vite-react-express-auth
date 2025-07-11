import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext();

const initialState = {
  user: null,
  loading: true,
  error: null,
  successMessage: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_SUCCESS':
      return { ...state, successMessage: action.payload, error: null };
    case 'CLEAR_MESSAGES':
      return { ...state, error: null, successMessage: null };
    case 'LOGOUT':
      return { ...state, user: null, loading: false, error: null, successMessage: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return;
      }

      const response = await authAPI.getProfile();
      dispatch({ type: 'SET_USER', payload: response.data.user });
    } catch (error) {
      localStorage.removeItem('accessToken');
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await authAPI.login(credentials);
      
      localStorage.setItem('accessToken', response.data.accessToken);
      dispatch({ type: 'SET_USER', payload: response.data.user });
      dispatch({ type: 'SET_SUCCESS', payload: `Welcome back, ${response.data.user.firstName}!` });
      
      return response;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Login failed' });
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await authAPI.register(userData);
      dispatch({ type: 'SET_LOADING', payload: false });
      dispatch({ type: 'SET_SUCCESS', payload: 'Account created successfully! Please check your email to verify your account.' });
      return response;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Registration failed' });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      dispatch({ type: 'LOGOUT' });
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authAPI.forgotPassword({ email });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (data) => {
    try {
      const response = await authAPI.resetPassword(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const clearMessages = () => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    checkAuth,
    clearMessages,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
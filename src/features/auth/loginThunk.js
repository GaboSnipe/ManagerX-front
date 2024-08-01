import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import axios from 'axios';
import { API_URL } from '../../http';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.access);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (thunkAPI) => {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/api/accounts/auth/jwt/refresh/`, { withCredentials: true });
      localStorage.setItem('token', response.data.access);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

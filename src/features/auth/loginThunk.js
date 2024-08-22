import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import axios from 'axios';
import { API_URL } from '../../http';
import { toast } from 'react-toastify';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      toast.error("Failed to Login", {
        containerId: "error"
      });
      
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const googleLoginThunk = createAsyncThunk(
  'auth/google/login',
  async ({ access_token }, thunkAPI) => {
    try {
      const response = await AuthService.googleLogin(access_token);
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      toast.error("Failed to Login", {
        containerId: "error"
      });
      
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);




export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);


export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      await AuthService.authCheck(token);
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response?.data || 'Unknown error');
    }
  }
);

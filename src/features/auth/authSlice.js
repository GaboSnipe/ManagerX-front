import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk, checkAuth, googleLoginThunk } from './loginThunk';

const initialState = {
  isAuth: false,
  userInfo: (() => {
    try {
      const userString = localStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    } catch (e) {
      return null;
    }
  })(),
  userToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setUserToken(state, action) {
      state.userToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginThunk.fulfilled, (state, action) => {
      state.isAuth = true;
      state.userInfo = action.payload.user;
      state.userToken = action.payload.access;
    })
    .addCase(loginThunk.rejected, (state, action) => {
      state.isAuth = false;
      state.userInfo = {};
      state.userToken = null;
      console.error(action.payload);
    })
    .addCase(googleLoginThunk.fulfilled, (state, action) => {
      state.isAuth = true;
      state.userInfo = action.payload.user;
      state.userToken = action.payload.access;
    })
    .addCase(googleLoginThunk.rejected, (state, action) => {
      state.isAuth = false;
      state.userInfo = {};
      state.userToken = null;
      console.error(action.payload);
    })
      .addCase(logoutThunk.fulfilled, (state) => {
        return undefined;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        console.error(action);
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuth = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        console.error(action.payload);
      });
  },
});

export const { setAuth, setUserInfo, setUserToken } = authSlice.actions;
export default authSlice.reducer;

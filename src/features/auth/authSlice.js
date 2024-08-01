import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk, checkAuth } from './loginThunk';

const initialState = {
  isAuth: false,
  userInfo: {},
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
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isAuth = false;
        state.userInfo = {};
        state.userToken = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        console.error(action.payload);
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuth = true;
        state.userInfo = action.payload.user;
        state.userToken = action.payload.access;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isAuth = false;
        state.userInfo = {};
        state.userToken = null;
        console.error(action.payload);
      });
  },
});

export const { setAuth, setUserInfo, setUserToken } = authSlice.actions;
export default authSlice.reducer;

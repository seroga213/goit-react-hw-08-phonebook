import { createSlice } from '@reduxjs/toolkit';
import { addUser, loginUser, logoutUser, refreshCurrentUser } from './operations';


const initialState = {
    user: { name: null, email: null },
    token: null,
    isloggedIn: false,
    isRefreshing: false,
  };


  export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
      [addUser.fulfilled](state, action) {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isloggedIn = true;
      },
      [loginUser.fulfilled](state, action) {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isloggedIn = true;
      },
      [logoutUser.fulfilled](state) {
        state.user = null;
        state.token = null;
        state.isloggedIn = false;
      },
      [refreshCurrentUser.pending](state) {
        state.isRefreshing = true;
      },
      [refreshCurrentUser.fulfilled](state, action) {
        state.user = action.payload;
        state.isloggedIn = true;
        state.isRefreshing = false;
      },
      [refreshCurrentUser.rejected](state) {
        state.isRefreshing = false;
      },
    },
  });
  
  export const { setUser } = userSlice.actions;
  
  export default userSlice.reducer;
  

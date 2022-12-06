import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const addUser = createAsyncThunk('user/addUser', async credentials => {
  try {
    const { data } = await axios.post('/users/signup', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    return alert('Email or paswword of name is wrong! Pls try again');
  }
});

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/login', credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      return alert('Email or paswword is wrong! Pls try again');
    }
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  try {
    await axios.post('/users/logout');
    token.unset();
  } catch (error) {}
});

export const refreshCurrentUser = createAsyncThunk(
  'user/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistatedToken = state.userSlice.token;

    if (persistatedToken === null) {
      return thunkAPI.rejectWithValue();
    }

    token.set(persistatedToken);

    try {
      const { data } = await axios.get('users/current');
      return data;
    } catch (error) {}
  }
);
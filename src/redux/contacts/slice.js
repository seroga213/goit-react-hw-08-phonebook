import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContacts, deleteContacts } from './operations';

const initialState = {
  error: '',
  isLoading: false,
  contacts: {
    items: [],
    filter: {
      value: '',
    },
  },
};

const setError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.contacts.filter.value = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.pending]: state => {
      state.isLoading = true;
      state.error = '';
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.contacts.items = action.payload;
    },
    [fetchContacts.rejected]: setError,

    [addContacts.pending]: state => {
      state.isLoading = true;
    },
    [addContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.contacts.items.push(action.payload);
    },
    [addContacts.rejected]: setError,
    [deleteContacts.pending]: state => {
      state.isLoading = true;
    },
    [deleteContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      let indexId = state.contacts.items.findIndex(
        el => el.id === action.payload
      );

      if (indexId === -1) {
        return alert(`Item with ${action.id} not wound`);
      }

      state.contacts.items.splice(indexId, 1);
    },
    [deleteContacts.rejected]: setError,
  },
});

export const { setFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
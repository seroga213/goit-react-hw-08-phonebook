import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContacts,
  deleteContacts,
  
} from './operations';


// const initialState = {
//     error: '',
//     isLoading: false,
//     isDeleting: false,
//     isAdd: false,
//     contacts: {
//       items: [],
//       filter: {
//         value: '',
//       },
//     },
//   };
  const setError = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  };

  export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
      error: '',
      isLoading: false,
      isDeleting: false,
      isAdd: false,
      contacts: {
        items: [],
        filter: {
          value: '',
        },
      },
    },
    reducers: {
      setFilter: (state, action) => {
        state.contacts.filter.value = action.payload;
      },
      setContact: (state, action) => {
        state.contacts.items.push(action.payload);
      },
      removeContact: (state, action) => {
        let indexId = state.contacts.items.findIndex(
          el => el.id === action.payload
        );
  
        if (indexId === -1) {
          return alert(`Item with ${action.id} not wound`);
        }
  
        state.contacts.items.splice(indexId, 1);
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
        state.isAdd = true;
      },
      [addContacts.fulfilled]: state => {
        state.isLoading = false;
        state.isAdd = false;
      },
      [addContacts.rejected]: setError,
      [deleteContacts.pending]: state => {
        state.isDeleting = true;
      },
      [deleteContacts.fulfilled]: state => {
        state.isDeleting = false;
      },
      [deleteContacts.rejected]: setError,
  
    },
  });
  
  export const { setFilter, setContact, removeContact } = contactsSlice.actions;
  
  export default contactsSlice.reducer;
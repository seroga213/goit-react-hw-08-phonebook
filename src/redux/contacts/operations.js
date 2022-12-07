import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { removeContact, setContact } from '../contacts/slice';


export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get('/contacts');
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const deleteContacts = createAsyncThunk(
    'contacts/deleteContacts',
    async (id, { rejectWithValue, dispatch }) => {
      try {
        await axios.delete(`/contacts/${id}`);
        // dispatch(removeContact(id));
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const addContacts = createAsyncThunk(
    'contacts/addContacts',
    async (credentials, { rejectWithValue, dispatch }) => {
      try {
        const contact = {
          name: credentials.name,
          number: credentials.phone,
        };
  
        const { data } = await axios.post('contacts', contact);
          console.log(data);
        // dispatch(setContact(data));
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
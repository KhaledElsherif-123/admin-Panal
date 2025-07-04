import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDrivers = createAsyncThunk('drivers/fetchDrivers', async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found in localStorage');
  const response = await axios.get('https://mahfouzapp.com/drivers', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.data;
});

//try and catch
const driversSlice = createSlice({
  name: 'drivers',
  initialState: {
    data: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch drivers';
      });
  },
});

export default driversSlice.reducer;

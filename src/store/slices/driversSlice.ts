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

export const fetchDriverById = createAsyncThunk(
  'drivers/fetchDriverById',
  async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found in localStorage');
    const response = await axios.get(`https://mahfouzapp.com/drivers/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data; // returns the whole response, including message
  }
);


//try and catch
const driversSlice = createSlice({
  name: 'drivers',
  initialState: {
    data: [],
    loading: false,
    error: null as string | null,
    selectedDriver: null,
    selectedDriverLoading: false,
    selectedDriverError: null as string | null,
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
      })
      .addCase(fetchDriverById.pending, (state) => {
        state.selectedDriverLoading = true;
        state.selectedDriverError = null;
        state.selectedDriver = null;
      })
      .addCase(fetchDriverById.fulfilled, (state, action) => {
        state.selectedDriverLoading = false;
        state.selectedDriver = action.payload;
      })
      .addCase(fetchDriverById.rejected, (state, action) => {
        state.selectedDriverLoading = false;
        state.selectedDriverError = action.error.message || 'Failed to fetch driver';
      });
  },
});

export default driversSlice.reducer;

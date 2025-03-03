import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Fetch all tickets
export const fetchTickets = createAsyncThunk("tickets/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/api/ticket/all");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch tickets");
  }
});

// Create a new ticket
export const createTicket = createAsyncThunk("tickets/create", async ({ title, notes, customerId }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/api/ticket/create?customerId=${customerId}`, { title, notes });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to create ticket");
  }
});

// Fetch tickets for a specific customer
export const fetchCustomerTickets = createAsyncThunk("tickets/fetchByCustomer", async (customerId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/api/ticket/user/${customerId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch customer tickets");
  }
});

export const updateTicket = createAsyncThunk("tickets/update", async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/ticket/update/${id}`, updateData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update ticket");
    }
  });

const ticketSlice = createSlice({
  name: "tickets",
  initialState: {
    allTickets: [],
    customerTickets: [],
    loading: false,
    error: null,
  },
  reducers: {   resetCustomerTickets: (state) => {
    state.customerTickets = []; // ✅ Clear customer tickets when switching users
  },},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.allTickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.allTickets.push(action.payload);
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCustomerTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomerTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.customerTickets = action.payload;
      })
      .addCase(fetchCustomerTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.allTickets = state.allTickets.map(ticket => 
          ticket.id === action.payload._id ? action.payload : ticket
        );
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { resetCustomerTickets } = ticketSlice.actions;
export default ticketSlice.reducer;

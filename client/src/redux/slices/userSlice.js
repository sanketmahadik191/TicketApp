import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Fetch all users
export const fetchUsers = createAsyncThunk("users/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/api/user/all");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch users");
  }
});

// Fetch a single user by ID
export const fetchUserById = createAsyncThunk("users/fetchById", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/api/user/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch user");
  }
});

// Update a user by ID
export const updateUser = createAsyncThunk("users/update", async ({ id, userData }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`/api/user/${id}`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to update user");
  }
});

// Delete a user by ID
export const deleteUser = createAsyncThunk("users/delete", async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/api/user/${id}`);
    return id; // Return ID to remove from the state
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to delete user");
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userInfo: null,  // Stores individual user details separately
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload; // Store user data separately
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map(user => user._id === action.payload._id ? action.payload : user);
        state.userInfo = action.payload; // Update the `user` object if it's the same user
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user._id !== action.payload);
        if (state.userInfo && state.userInfo._id === action.payload) {
          state.userInfo = null; // Clear the user if it's the deleted one
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

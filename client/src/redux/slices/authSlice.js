import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const loginUser = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", userData);
    console.log(response.data);
    
    sessionStorage.setItem("token", response.data.token);
    sessionStorage.setItem("role", response.data.role);
    sessionStorage.setItem("user", response.data.user?.name);
    console.log("response.data",response.data);
    
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const signupUser = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/api/auth/register", userData);
    console.log("response.data",response.data);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error.response ? error.response.data : error.message);
    return rejectWithValue(error.response?.data || "An error occurred");
  
  }
});



const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: !!sessionStorage.getItem("token"),
    role: sessionStorage.getItem("role") || null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

      })
      .addCase(signupUser.pending, (state) => { state.loading = true; })
      .addCase(signupUser.fulfilled, (state) => { state.loading = false; })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

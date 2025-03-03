// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import userReducer from "./slices/userSlice";
import ticketReducer from "./slices/ticketSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    users: userReducer,
    tickets: ticketReducer,
  },
});

export default store;

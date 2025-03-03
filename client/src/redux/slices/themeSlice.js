import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  let storedTheme = localStorage.getItem("theme");
  if (!storedTheme) {
    storedTheme = "light"; // Set theme to light only once
    localStorage.setItem("theme", storedTheme);
  }
  document.documentElement.setAttribute("data-theme", storedTheme);
  return storedTheme;
};

const initialState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

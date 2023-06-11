import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    isAuthenticated: false,
    token: null,
    expiryDate: null,
    type: null,
    userID: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.type = action.payload.type;
      state.userID = action.payload.userID;
      state.expiryDate = action.payload.userID;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.type = null;
      state.userID = null;
      state.expiryDate = null;
    },
    setExpiryDate(state, action) {
      state.expiryDate = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;

"use client";

import { createSlice } from "@reduxjs/toolkit";
import { CommonStateType } from "@/types/redux";

const initialState: CommonStateType = {
  loading: false,
  adminUser: undefined,
  wsUser: undefined
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoadingState(state, action) {
      state.loading = action.payload;
    },
    setAdminUserDetailsState(state, action) {
      state.adminUser = action.payload;
    },
    setWholeSalerUserDetailsState(state, action) {
      state.adminUser = action.payload;
    },
  },
});

export const { setLoadingState, setAdminUserDetailsState, setWholeSalerUserDetailsState } = commonSlice.actions;
export default commonSlice.reducer;

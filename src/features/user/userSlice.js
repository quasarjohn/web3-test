import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // ideally we get this from a middleware from an auth token
  email: "gilbert@cuaresma.com",
  // set when user connects wallet
  walletAddress: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      if (action.payload.email !== undefined) {
        state.email = action.payload.email;
      }
      if (action.payload.walletAddress !== undefined) {
        state.walletAddress = action.payload.walletAddress;
      }
    },
    clearUserData: (state) => {
      state.email = null;
      state.walletAddress = null;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState { userInfo: any }
const userInfo = localStorage.getItem('userInfo');

// Defined the initial state using that type
const initialState: UserState = {
  userInfo: userInfo ? JSON.parse(userInfo) : null,
};

const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{name: string, email: string}>) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    }
  }
})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
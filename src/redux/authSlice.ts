import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';


interface AuthState {
  isAuthenticated: boolean;
  user: {
    uid: string;
    displayName?: string | null;
    email?: string | null
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = {
        uid: action.payload.uid,
        displayName: action.payload.displayName,
        email: action.payload.email
      };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

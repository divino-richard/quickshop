import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSession } from '../../../types/userTypes';

interface AuthState {
  session: UserSession
  error: {
      message: string | null;
  }
}

const userSession = localStorage.getItem('user');
let userSessionJSON: UserSession | null = null;

if (userSession) {
  userSessionJSON = JSON.parse(userSession);
}

const initialState: AuthState = {
  session: {
    data: userSessionJSON ? userSessionJSON.data : null,
    token: userSessionJSON ? userSessionJSON.token : null,
  },
  error: {
    message: null
  },
};

const authSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    userAuthenticated(state: AuthState, action: PayloadAction<UserSession>) {
      state.session = action.payload;
    },
    authenticationFailed(state: AuthState, action: PayloadAction<string>) {
      state.error.message = action.payload;
    },
    userLoggedOut(state: AuthState, action: PayloadAction<null>) {
      state.session.data = null;
      state.session.token = null;
    },
  },
});

export const {
  userAuthenticated,
  authenticationFailed,
  userLoggedOut,
} = authSlice.actions;

export default authSlice.reducer;

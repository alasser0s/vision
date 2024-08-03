import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  email: string;
  username: string;
  photoUrl?: string;
  // Add other relevant fields here
}

interface UsersState {
  currentUser: User | null;
  error: string | null;
  loading: boolean;
}

const initialState: UsersState = {
  currentUser: null,
  error: null,
  loading: false,
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInstart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInErorr: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;

    },
    
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action:PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action:PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInErorr, signInstart, signInSuccess , updateFailure, updateSuccess ,updateStart } = userSlice.actions;
export default userSlice.reducer;

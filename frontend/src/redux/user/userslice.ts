import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
  currentUser: any;
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
  },
});

export const { signInErorr, signInstart, signInSuccess } = userSlice.actions;
export default userSlice.reducer;

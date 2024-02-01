import { PayloadAction, createSlice } from "@reduxjs/toolkit";
//i did not need this tree
//but i let one example because i believe you guys can be using
type InitialState = {
  user: AuthState;
};

type AuthState = {
  isAuth: boolean;
  name: string;
  email?: string;
  id: number;
  role: string;
};

const initialState = {
  user: {
    isAuth: false,
    name: "",
    email: "",
    id: 0,
    role: "user",
  },
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<AuthState>) => {
      return {
        user: {
          name: action.payload.name,
          isAuth: action.payload.isAuth,
          id: action.payload.id,
          role: action.payload.role,
          email: action.payload.email,
        },
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;

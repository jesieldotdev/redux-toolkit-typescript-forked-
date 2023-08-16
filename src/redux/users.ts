import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface User {
  id?: string;
  name: string;
}

const users = createSlice({
  name: "users",
  initialState: [] as User[],
  reducers: {
    addUser: (state, action: PayloadAction<string>) => {
      state.push({
        id: uuidv4(),
        name: action.payload,
      });

      return state;
    },

    deleteUser: (state, action: PayloadAction<string>) => {
      state.filter((user) => {
        if (user.id === action.payload) {
          const index = state.indexOf(user);
          // alert(user.id);
          state.splice(index, 1);
        }
      });
    },
  },
});

export default users;

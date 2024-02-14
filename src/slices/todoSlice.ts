import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
  data: ToDoProp[] | null;
}

// Define the initial state using that type
const initialState: TodoState = {
  data: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<ToDoProp[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setTodos } = todoSlice.actions;

export default todoSlice.reducer;

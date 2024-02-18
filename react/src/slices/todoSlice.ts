import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
  data: ToDos[];
  viewType: "grid" | "list";
}

// Define the initial state using that type
const initialState: TodoState = {
  data: [],
  viewType: "grid",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<ToDos[]>) => {
      state.data = action.payload;
      localStorage.setItem("todos", JSON.stringify(action.payload));
    },
    setViewType: (state, action) => {
      state.viewType = action.payload;
    },
  },
});

export const { setTodos, setViewType } = todoSlice.actions;

export default todoSlice.reducer;

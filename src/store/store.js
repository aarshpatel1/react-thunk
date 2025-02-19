import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../feature/todosSlice";

export const store = configureStore({
	reducer: {
		todos: todosReducer,
	},
});

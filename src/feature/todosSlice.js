import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
	name: "todos",
	initialState: {
		items: [],
		status: "idle",
		filter: "all", // all , active , completed
		searchTerm: "",
		error: null,
	},

	reducers: {
		addTodoStart: (state) => {
			state.status = "loading";
			state.error = null;
		},
		addToSuccess: (state, action) => {
			state.status = "idle";
			state.items.push(action.payload);
		},
		addTodoError: (state, action) => {
			state.status = "idle";
			state.error = action.payload;
		},
		toggleTodoSuccess: (state, action) => {
			const todo = state.items.find((todo) => todo.id === action.payload);
			if (todo) {
				todo.completed = !todo.completed;
			}
		},
		setFilter: (state, action) => {
			state.filter = action.payload;
		},
		setSearchTerm: (state, action) => {
			state.searchTerm = action.payload;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
});

export const {
	addToSuccess,
	addTodoError,
	addTodoStart,
	toggleTodoSuccess,
	setFilter,
	setSearchTerm,
	clearError,
} = todosSlice.actions;

// thunk action creators
export const addtodo = (text) => (dispatch) => {
	if (!text.trim()) {
		dispatch(addTodoError("Todo text can not be empty"));
		return;
	}

	dispatch(addTodoStart());

	try {
		dispatch(
			addToSuccess({
				id: Date.now(),
				text,
				completed: false,
			})
		);
	} catch (error) {
		dispatch(addTodoError("Error adding todo"));
	}
};

export const toggleTodo = (id) => (dispatch) => {
	dispatch(toggleTodoSuccess(id));
};

export const setTodoFilter = (filter) => (dispatch) => {
	dispatch(setFilter(filter));
};

export const searchTodo = (term) => (dispatch) => {
	dispatch(setSearchTerm(term));
};

export default todosSlice.reducer;

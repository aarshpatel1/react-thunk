import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	addtodo,
	toggleTodo,
	setTodoFilter,
	searchTodo,
	clearError,
} from "../feature/todosSlice";

function TodoList() {
	const [newTodo, setNewTodo] = useState("");
	const dispatch = useDispatch();

	const { items, status, filter, searchTerm, error } = useSelector(
		(state) => state.todos
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (newTodo.trim()) {
			dispatch(addtodo(newTodo.trim()));
			setNewTodo("");
		}
	};

	const handletoggle = (id) => {
		dispatch(toggleTodo(id));
	};

	const handleFilterChange = (newFilter) => {
		dispatch(setTodoFilter(newFilter));
	};

	const handleSearch = (e) => {
		dispatch(searchTodo(e.target.value));
	};

	const filterItems = items
		.filter((todo) => {
			if (filter === "active") return !todo.completed;
			if (filter === "completed") return todo.completed;
			return true;
		})
		.filter((todo) =>
			todo.text.toLowerCase().includes(searchTerm.toLowerCase())
		);

	return (
		<div className="d-flex flex-column align-items-center justify-content-center vh-100 container">
			<h1>To Do list</h1>

			{error && (
				<div className="alert alert-danger alert-dismissible fade show">
					{error}
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="alert"
						aria-label="Close"
					></button>
				</div>
			)}

			<div className="filters">

				{/* add todo form */}
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
						placeholder="Add new Todo"
						disabled={status === "loading"}
						className="form-control my-3"
					/>

					<button
						type="submit"
						disabled={status === "loading"}
						className="btn btn-secondary"
					>
						{status === "loading" ? "Adding" : "Add Todo"}
					</button>
				</form>

				<div className="filter-buttons">

					{/* todo filter search form */}
					<input
						type="search"
						placeholder="seach todo"
						value={searchTerm}
						onChange={handleSearch}
						className="form-control mt-3"
					/>

					<div className="btn-group my-3">
						<button
							onClick={() => handleFilterChange("all")}
							className={`btn btn-secondary ${
								filter === "all" ? "active" : ""
							}`}
						>
							All
						</button>

						<button
							onClick={() => handleFilterChange("active")}
							className={`btn btn-secondary ${
								filter === "active" ? "active" : ""
							}`}
						>
							Active
						</button>

						<button
							onClick={() => handleFilterChange("completed")}
							className={`btn btn-secondary ${
								filter === "completed" ? "active" : ""
							}`}
						>
							Completed
						</button>
					</div>

					<ul className="list-group mt-3">
						{filterItems.map((todo) => (
							<li
								key={todo.id}
								onClick={() => handletoggle(todo.id)}
								style={{
									textDecoration: todo.completed ? "line-through" : "none",
									cursor: "pointer",
								}}
								className="list-group-item list-group-item-action "
							>
								{todo.text}
							</li>
						))}
					</ul>
					
				</div>
			</div>
		</div>
	);
}

export default TodoList;

import TodoList from "./components/TodoList";
import { store } from "./store/store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<Provider store={store}>
			<TodoList />
		</Provider>
	);
}

export default App;

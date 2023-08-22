import "./App.css";
import TodoList from "./components/TodoList/TodoList";
import { createTodosGateway } from "./factory/TodosGatewayFactory";

const App = () => {
  return <TodoList todosGateway={createTodosGateway()} />;
};

export default App;

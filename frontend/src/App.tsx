import "./App.css";
import useTodoList from "./entity/TodoList";
import TodosGateway from "./infra/gateway/TodosGateway";

const App = ({ todosGateway }: { todosGateway: TodosGateway }) => {
  const {
    getTotal,
    addTodo,
    toggleDone,
    deleteTodo,
    completed,
    todos,
    description,
    setDescription,
  } = useTodoList(todosGateway);

  return (
    <div>
      <h1 aria-label="total">Total: {getTotal()}</h1>
      <h2 aria-label="completed">Completed: {completed}%</h2>
      {todos.map((todo) => (
        <div key={todo.id} aria-label="todo-item">
          <h3 aria-label="todo-description">{todo.description}</h3>
          <h3 aria-label="todo-done">{todo.done.toString()}</h3>
          <button
            aria-label="todo-toggle-done-button"
            onClick={() => toggleDone(todo)}
          >
            done/undone
          </button>
          <button
            aria-label="todo-delete-button"
            onClick={() => deleteTodo(todo)}
          >
            delete
          </button>
          <br />
        </div>
      ))}
      <input
        aria-label="todo-description-input"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button aria-label="add-todo-button" onClick={() => addTodo()}>
        Add
      </button>
    </div>
  );
};

export default App;

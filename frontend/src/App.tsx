import { useEffect, useState } from "react";
import "./App.css";

type TTodo = {
  id: number;
  description: string;
  done: boolean;
};

function App() {
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [completed, setCompleted] = useState(0);

  function getTotal() {
    return todos.length;
  }

  function getCompleted() {
    const total = getTotal();
    const completed = todos.filter((todo) => todo.done).length;
    setCompleted(Math.round((completed / total) * 100));
  }

  useEffect(() => {
    getCompleted();
  }, [todos.length]);

  function addTodo() {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: prevTodos.length + 1, description, done: false },
    ]);
  }

  function toggleDone(todo: TTodo) {
    todo.done = !todo.done;
    getCompleted();
  }

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
}

export default App;

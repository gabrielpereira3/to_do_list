import { useState } from "react";
import "./App.css";

type TTodo = {
  id: number;
  description: string;
  done: boolean;
};

function App() {
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState<TTodo[]>([]);

  function getTotal() {
    return todos.length;
  }

  function getCompleted() {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.done).length;
    return Math.round((completed / total) * 100);
  }

  function addTodo() {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: prevTodos.length + 1, description, done: false },
    ]);
  }

  return (
    <div>
      <h1 aria-label="total">Total: {getTotal()}</h1>
      <h2 aria-label="completed">Completed: {getCompleted()}%</h2>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h3 aria-label="todo-description">{todo.description}</h3>
          <h3 aria-label="todo-done">{todo.done.toString()}</h3>
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

import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

type TTodo = {
  id: number;
  description: string;
  done: boolean;
};

function App() {
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/todos").then((response) => {
      setTodos([...response.data]);
    });
  }, []);

  useEffect(() => {
    getCompleted();
  }, [todos.length]);

  function getTotal() {
    return todos.length;
  }

  function getCompleted() {
    const total = getTotal();
    if (total === 0) return 0;
    const completedList = todos.filter((todo) => todo.done).length;
    setCompleted(Math.round((completedList / total) * 100));
  }

  function clearDescription() {
    setDescription("");
  }

  function addTodo() {
    if (todos.some((todo) => todo.description === description)) return;
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: prevTodos.length + 1, description, done: false },
    ]);
    clearDescription();
  }

  function toggleDone(todo: TTodo) {
    todo.done = !todo.done;
    getCompleted();
  }

  function deleteTodo(todo: TTodo) {
    setTodos((prevTodos) =>
      prevTodos.filter((item: TTodo) => item.id !== todo.id)
    );
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
}

export default App;

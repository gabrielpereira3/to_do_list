import { useState } from "react";
import "./App.css";

function App() {
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState<{ description: string; done: boolean }[]>(
    []
  );

  function getTotal() {
    return todos.length;
  }

  function getCompleted() {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.done).length;
    return Math.round((completed / total) * 100);
  }

  function addTodo() {
    setTodos((prevTodos) => [...prevTodos, { description, done: false }]);
  }

  return (
    <div>
      <h1>Total: {getTotal()}</h1>
      <h1>Completed: {getCompleted()}%</h1>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={() => addTodo()}>Add</button>
    </div>
  );
}

export default App;

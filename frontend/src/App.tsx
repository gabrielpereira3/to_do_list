import { useState } from "react";
import "./App.css";

function App() {
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState<[{ description: string; done: boolean }]>(
    []
  );

  function getCompleted() {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.done).length;
    return Math.round((completed / total) * 100);
  }

  function addTodo() {
    const array = todos;
    array.push({ description, done: false });
    setTodos(array);
    // setTodos((todos) => {...todos, { description, done: false }})
    // todos.push({ description, done: false });
  }

  return (
    <div>
      <h1>Total: {todos.length}</h1>
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

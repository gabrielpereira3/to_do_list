import TodosGateway from "../infra/gateway/TodosGateway";
import { TTodo } from "../types/TodoType";
import { useEffect, useState } from "react";

const useTodoList = (todosGateway: TodosGateway) => {
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    todosGateway.getTodos().then((todosData) => {
      setTodos([...todosData]);
    });
  }, []);

  useEffect(() => {
    getCompleted();
  }, [todos.length]);

  const getTotal = () => {
    return todos.length;
  };

  const getCompleted = () => {
    const total = getTotal();
    if (total === 0) return 0;
    const completedList = todos.filter((todo) => todo.done).length;
    setCompleted(Math.round((completedList / total) * 100));
  };

  const clearDescription = () => {
    setDescription("");
  };

  const addTodo = () => {
    if (todos.some((todo) => todo.description === description)) return;
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: prevTodos.length + 1, description, done: false },
    ]);
    clearDescription();
  };

  const toggleDone = (todo: TTodo) => {
    todo.done = !todo.done;
    getCompleted();
  };

  const deleteTodo = (todo: TTodo) => {
    setTodos((prevTodos) =>
      prevTodos.filter((item: TTodo) => item.id !== todo.id)
    );
  };

  return {
    getTotal,
    addTodo,
    toggleDone,
    deleteTodo,
    completed,
    todos,
    description,
    setDescription,
  };
};

export default useTodoList;

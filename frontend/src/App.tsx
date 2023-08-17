import "./App.css";

function App() {
  const todos: Array<{ description: string; done: boolean }> = [
    { description: "Criar os testes de unidade", done: false },
    { description: "Criar os testes de integração", done: false },
    { description: "Criar os testes E2E", done: true },
  ];

  function getTotal() {
    return todos.length;
  }

  return <div>{getTotal()}</div>;
}

export default App;

import { create } from "zustand";
import TodosGatewayHttp from "../../infra/gateway/TodosGatewayHttp";
import TodosGateway from "../../infra/gateway/TodosGateway";

type StoreProps = {
  todosGateway: TodosGateway;
};

const todosGateway: TodosGateway = new TodosGatewayHttp();

const useTodos = create<StoreProps>(() => ({
  todosGateway: todosGateway,
}));

export default useTodos;

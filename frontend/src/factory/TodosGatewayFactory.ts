import TodosGatewayHttp from "../infra/gateway/TodosGatewayHttp";
import TodosGateway from "../infra/gateway/TodosGateway";

export const createTodosGateway = (): TodosGateway => {
  return new TodosGatewayHttp();
};

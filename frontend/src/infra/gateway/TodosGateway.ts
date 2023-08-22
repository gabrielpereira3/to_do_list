import { TTodo } from "../../types/TodoType";

export default interface TodosGateway {
  getTodos(): Promise<TTodo[]>;
}

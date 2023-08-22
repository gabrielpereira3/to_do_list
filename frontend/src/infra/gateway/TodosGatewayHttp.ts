import axios from "axios";
import TodosGateway from "./TodosGateway";
import { TTodo } from "../../types/TodoType";

export default class TodosGatewayHttp implements TodosGateway {
  async getTodos(): Promise<TTodo[]> {
    const response = await axios.get("http://localhost:3000/todos");
    const todosData = response.data;
    return todosData;
  }
}

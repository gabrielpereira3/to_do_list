import "@testing-library/jest-dom";
import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import TodoList from "../src/components/TodoList/TodoList";
import userEvent from "@testing-library/user-event";
import { createTodosGateway } from "../src/factory/TodosGatewayFactory";

function setup(jsx: React.JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

describe("Todo list integration", function () {
  test("Deve testar a todo list vazia", async function () {
    render(<TodoList todosGateway={createTodosGateway()} />);
    await sleep(100);
    expect(screen.getByLabelText("total")).toHaveTextContent("Total: 1");
    expect(screen.getByLabelText("completed")).toHaveTextContent(
      "Completed: 0%"
    );
  });

  test("Não deve deixar inserir todo duplicado", async function () {
    const { user } = setup(<TodoList todosGateway={createTodosGateway()} />);
    await sleep(100);
    const input = screen.getByLabelText("todo-description-input");
    const button = screen.getByLabelText("add-todo-button");
    await user.type(input, "A");
    await user.click(button);
    await user.type(input, "A");
    await user.click(button);
    expect(screen.getByLabelText("total")).toHaveTextContent("Total: 2");
    expect(screen.getByLabelText("completed")).toHaveTextContent(
      "Completed: 0%"
    );
  });

  test("Deve testar a todo list", async function () {
    const { user, ...render } = setup(
      <TodoList todosGateway={createTodosGateway()} />
    );
    await sleep(100);
    const input = screen.getByLabelText("todo-description-input");
    const button = screen.getByLabelText("add-todo-button");
    await user.type(input, "A");
    await user.click(button);
    expect(screen.getByLabelText("total")).toHaveTextContent("Total: 2");
    expect(screen.getByLabelText("completed")).toHaveTextContent(
      "Completed: 0%"
    );
    const allTodos = await render.findAllByLabelText("todo-item");
    expect(
      within(allTodos[1]).getByLabelText("todo-description")
    ).toHaveTextContent("A");
    expect(within(allTodos[1]).getByLabelText("todo-done")).toHaveTextContent(
      "false"
    );
    await user.type(input, "B");
    await user.click(button);
    expect(screen.getByLabelText("total")).toHaveTextContent("Total: 3");
    const toggleButton = within(allTodos[0]).getByLabelText(
      "todo-toggle-done-button"
    );
    await user.click(toggleButton);
    expect(screen.getByLabelText("completed")).toHaveTextContent(
      "Completed: 33%"
    );
    const deleteButton = await within(allTodos[0]).getByLabelText(
      "todo-delete-button"
    );
    await user.click(deleteButton);
    expect(screen.getByLabelText("total")).toHaveTextContent("Total: 2");
    expect(screen.getByLabelText("completed")).toHaveTextContent(
      "Completed: 0%"
    );
  });
});

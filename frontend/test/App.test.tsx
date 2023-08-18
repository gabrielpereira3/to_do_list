import "@testing-library/jest-dom";
import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import App from "../src/App";
import userEvent from "@testing-library/user-event";

function setup(jsx: React.JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("Todo list", function () {
  test("Deve testar a todo list vazia", async function () {
    render(<App />);
    expect(screen.getByLabelText("total")).toHaveTextContent("Total: 0");
    expect(screen.getByLabelText("completed")).toHaveTextContent(
      "Completed: 0%"
    );
  });

  test("Não deve deixar inserir todo duplicado", async function () {
    const { user } = setup(<App />);
    const input = screen.getByLabelText("todo-description-input");
    const button = screen.getByLabelText("add-todo-button");
    await user.type(input, "A");
    await user.click(button);
    await user.type(input, "A");
    await user.click(button);
    expect(screen.getByLabelText("total")).toHaveTextContent("Total: 1");
    expect(screen.getByLabelText("completed")).toHaveTextContent(
      "Completed: 0%"
    );
  });

  test("Deve testar a todo list", async function () {
    const { user, ...render } = setup(<App />);
    const input = screen.getByLabelText("todo-description-input");
    const button = screen.getByLabelText("add-todo-button");
    await user.type(input, "A");
    await user.click(button);
    expect(screen.getByLabelText("total")).toHaveTextContent("Total: 1");
    expect(screen.getByLabelText("completed")).toHaveTextContent(
      "Completed: 0%"
    );
    expect(screen.getByLabelText("todo-description")).toHaveTextContent("A");
    expect(screen.getByLabelText("todo-done")).toHaveTextContent("false");
    await user.type(input, "B");
    await user.click(button);
    expect(screen.getByLabelText("total")).toHaveTextContent("Total: 2");
    const allTodos = await render.findAllByLabelText("todo-item");
    const toggleButton = await within(allTodos[0]).getByLabelText(
      "todo-toggle-done-button"
    );
    await user.click(toggleButton);
    expect(screen.getByLabelText("completed")).toHaveTextContent(
      "Completed: 50%"
    );
    const deleteButton = await within(allTodos[0]).getByLabelText(
      "todo-delete-button"
    );
    await user.click(deleteButton);
    expect(screen.getByLabelText("total")).toHaveTextContent("Total: 1");
    expect(screen.getByLabelText("completed")).toHaveTextContent(
      "Completed: 0%"
    );
  });
});
